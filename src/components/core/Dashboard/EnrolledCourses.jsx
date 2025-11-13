import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await getUserEnrolledCourses(token) // Getting all the published and the drafted courses

        // Filtering the published course out
        const filterPublishCourse = res.filter((ele) => ele.status !== "Draft")
        // console.log(
        //   "Viewing all the couse that is Published",
        //   filterPublishCourse
        // )

        setEnrolledCourses(filterPublishCourse)
      } catch (error) {
        console.log("Could not fetch enrolled courses.")
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="text-2xl sm:text-3xl font-bold text-richblack-50 mb-6 sm:mb-8">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[20vh] w-full place-content-center text-richblack-5 text-center text-base sm:text-lg">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div className="my-6 sm:my-8 text-richblack-5 overflow-x-auto">
          {/* Headings */}
          <div className="hidden sm:flex rounded-t-lg bg-richblack-500 min-w-[600px]">
            <p className="w-[45%] px-3 sm:px-5 py-3 sm:py-4 font-semibold">Course Name</p>
            <p className="w-1/4 px-2 py-3 sm:py-4 font-semibold">Duration</p>
            <p className="flex-1 px-2 py-3 sm:py-4 font-semibold">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`flex flex-col sm:flex-row items-start sm:items-center border border-richblack-700 min-w-[600px] sm:min-w-0 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              } ${i === 0 && arr.length === 1 ? "rounded-lg" : ""} ${i === 0 && arr.length > 1 ? "sm:rounded-t-none rounded-t-lg" : ""}`}
              key={i}
            >
              <div
                className="flex w-full sm:w-[45%] cursor-pointer items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3 sm:py-4 hover:bg-richblack-700 transition-colors duration-200"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex flex-1 max-w-xs flex-col gap-1 sm:gap-2">
                  <p className="font-bold text-sm sm:text-base lg:text-lg">{course.courseName}</p>
                  <p className="text-xs sm:text-sm text-richblack-300 leading-relaxed">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-full sm:w-1/4 px-3 sm:px-2 py-2 sm:py-3 text-sm sm:text-base font-medium">
                <span className="sm:hidden text-richblack-400">Duration: </span>
                {course?.totalDuration}
              </div>
              <div className="flex w-full sm:w-1/5 flex-col gap-1 sm:gap-2 px-3 sm:px-2 py-2 sm:py-3">
                <p className="text-sm sm:text-base font-medium">Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="6px"
                  isLabelVisible={false}
                  bgColor="#FFD60A"
                  baseBgColor="#374151"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
