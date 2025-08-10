import React from "react"
import copy from "copy-to-clipboard"// for sharing the course copy the current course url in clipboard
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"

// const CourseIncludes = [
//   "8 hours on-demand video",
//   "Full Lifetime access",
//   "Access on Mobile and TV",
//   "Certificate of completion",
// ]

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)//to see whether usne phle se liya hua hai ya nhi vo course 
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course
//course se poora data nikal liya hai brother
  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  // console.log("Student already enrolled ", course?.studentsEnroled, user?._id)

  return (
    <>
      <div
        className={`flex flex-col gap-4 sm:gap-6 rounded-xl bg-richblack-700 p-4 sm:p-6 text-richblack-5 shadow-2xl`}
      >
        {/* Course Image */}
        <img
          src={ThumbnailImage}
          alt={course?.courseName}
          className="max-h-[250px] sm:max-h-[300px] min-h-[150px] sm:min-h-[180px] w-full overflow-hidden rounded-xl object-cover"
        />

        <div className="px-2 sm:px-4">
          <div className="pb-4 sm:pb-6 text-2xl sm:text-3xl font-bold">
            Rs. {CurrentPrice}
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <button
              className="yellowButton w-full"
              onClick={
                user && course?.studentsEnroled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentsEnroled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !course?.studentsEnroled.includes(user?._id)) && (
              <button onClick={handleAddToCart} className="blackButton w-full">
                Add to Cart
              </button>
            )}
          </div>
          <div>
            <p className="pb-3 sm:pb-4 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div>
            <p className={`my-3 sm:my-4 text-lg sm:text-xl font-bold`}>
              This Course Includes :
            </p>
            <div className="flex flex-col gap-2 sm:gap-3 text-sm sm:text-base text-caribbeangreen-100">
              {course?.instructions?.map((item, i) => {
                return (
                  <p className={`flex gap-2`} key={i}>
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                )
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-4 sm:py-6 text-yellow-100 hover:text-yellow-50 transition-colors duration-200 font-medium"
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseDetailsCard
