import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/Common/ConfirmationModal"
import Footer from "../components/Common/Footer"
import RatingStars from "../components/Common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { BuyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Getting courseId from url parameter
  const { courseId } = useParams()
  // console.log(`course id: ${courseId}`) //course id se poori info le aaye 

  // State to save the course details
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])

  // Calculating Avg Review count
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)//array dediya rating revies vala brooooo
    setAvgReviewCount(count)
  }, [response])

  // Collapse sections
  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    // console.log("called", id)
    //active means kis section ko open dikhana hai kisi nhi (band hi) if phle se active hai to na krdo means toglling hi to hai basically
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e !== id)
    )
  }

  // Total number of lectures sec--> has subsections which represents the data
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!response.success) {
    return <Error />
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnroled,
    createdAt,
  } = response.data?.courseDetails

  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    // if trying to buy without getting logged in any course
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 sm:px-6 lg:px-8 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[400px] sm:min-h-[450px] max-w-maxContentTab justify-items-center py-6 sm:py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[20rem] sm:max-h-[30rem] lg:hidden w-full">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full rounded-xl object-cover"
              />
            </div>
            <div
              className={`z-30 my-4 sm:my-5 flex flex-col justify-center gap-4 sm:gap-6 py-4 sm:py-5 text-base sm:text-lg text-richblack-5`}
            >
              <div>
                <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-richblack-5 leading-tight">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200 text-sm sm:text-base lg:text-lg leading-relaxed`}>{courseDescription}</p>
              <div className="text-sm sm:text-base flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews?.length || 0} reviews)`}</span>
                <span>{`${studentsEnroled?.length || 0} students enrolled`}</span>
              </div>
              <div>
                <p className="text-sm sm:text-base font-medium">
                  Created By {`${instructor.firstName} ${instructor.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-5 text-sm sm:text-base">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 sm:gap-6 border-y border-y-richblack-500 py-4 sm:py-6 lg:hidden">
              <p className="pb-2 sm:pb-4 text-2xl sm:text-3xl font-bold text-richblack-5">
                Rs. {price}
              </p>
              <button className="yellowButton w-full" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton w-full">Add to Cart</button>
            </div>
          </div>
          {/* Courses Card */}
          <div className="right-4 lg:right-8 top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[380px] lg:max-w-[410px] translate-y-16 lg:translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <CourseDetailsCard
              course={response?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 sm:px-6 lg:px-8 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-6 sm:my-8 border border-richblack-600 p-4 sm:p-6 lg:p-8 rounded-xl">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold">What you'll learn</p>
            <div className="mt-4 sm:mt-5 text-sm sm:text-base leading-relaxed">
              <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
            </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold">Course Content</p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-between gap-3 sm:gap-2">
                <div className="flex flex-wrap gap-2 sm:gap-3 text-sm sm:text-base">
                  <span>
                    {courseContent?.length || 0} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{response.data?.totalDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25 text-sm sm:text-base hover:text-yellow-50 transition-colors duration-200"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4 sm:py-6">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            {/* Author Details */}
            <div className="mb-8 sm:mb-12 py-4 sm:py-6">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold">Author</p>
              <div className="flex items-center gap-3 sm:gap-4 py-4 sm:py-6">
                <img
                  src={
                    instructor?.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor?.firstName || "U"} ${instructor?.lastName || "I"}`
                  }
                  alt="Author"
                  className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full object-cover"
                />
                <p className="text-base sm:text-lg lg:text-xl font-semibold">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50 text-sm sm:text-base leading-relaxed">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CourseDetails
