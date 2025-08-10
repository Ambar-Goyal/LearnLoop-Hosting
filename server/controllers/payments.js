const { instance } = require("../config/razorpay") // npm i razorpay 
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")

// ===============================
// Capture the payment and initiate the Razorpay order
// This is the first step of payment integration
// ===============================
exports.capturePayment = async (req, res) => {
  const { courses } = req.body
  const userId = req.user.id // as auth middleware adds in the req body the user id 

  // If no course IDs are provided → stop here
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0 // to store the total cart amount

  // Loop through each course in the cart
  for (const course_id of courses) {
    let course
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Convert userId to ObjectId for comparison in MongoDB arrays
      const uid = new mongoose.Types.ObjectId(userId) 

      // Check if the user is already enrolled in the course
      if (course.studentsEnroled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      } 

      // If valid → add the course price to the total amount
      total_amount += course.price

    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    } 
  }

  // Razorpay order creation options
  const options = {
    amount: total_amount * 100, // converting to paise
    currency: "INR",
    receipt: Math.random(Date.now()).toString(), // random receipt ID
    // notes can be added here if you want to pass courseId & userId
  }

  try {
    // Initiate the payment using Razorpay Orders API
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse, // send order details to frontend for Razorpay checkout
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// ===============================
// Verify the payment
// This checks Razorpay's signature against our generated signature
// If both match → payment is authorized and enrollment happens
// ===============================
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature // hashed signature from Razorpay
  const courses = req.body?.courses
  const userId = req.user.id

  // Basic validation → if any required field is missing, fail
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  // Create a string in the format: orderId|paymentId
  let body = razorpay_order_id + "|" + razorpay_payment_id

  // Generate HMAC SHA256 signature using our Razorpay secret
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET) // secret key from env
    .update(body.toString()) // update HMAC object with orderId|paymentId
    .digest("hex") // convert to hex string for comparison

  // Compare generated signature with the one sent by Razorpay
  if (expectedSignature === razorpay_signature) {
    // ✅ Payment is verified → enroll student in courses
    await enrollStudents(courses, userId, res) // this call can also be triggered via webhook
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  // ❌ If signature does not match → fail
  return res.status(200).json({ success: false, message: "Payment Failed" })
}

// ===============================
// Send Payment Success Email
// This sends a confirmation email after successful payment
// ===============================
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body
  const userId = req.user.id

  // Basic validation
  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    // Get user details for sending email
    const enrolledStudent = await User.findById(userId)

    // Send payment success email
    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100, // convert paise to INR
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// ===============================
// Enroll the student in multiple courses after successful payment
// Also creates a CourseProgress entry for each course
// Sends enrollment confirmation email
// ===============================
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Add student to course's studentsEnroled array
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnroled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      // Create progress tracker for this student & course so as to avoid error further
      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      })

      // Add course and progress reference to student record
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)

      // Send enrollment confirmation email
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}
//captured and verifying the payment hui hai