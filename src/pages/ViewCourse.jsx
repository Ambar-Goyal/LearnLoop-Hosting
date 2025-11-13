import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      // console.log("Course Data here... ", courseData.courseDetails)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="relative flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-4 sm:mx-6 lg:mx-8">
            {/* Mobile course navigation */}
            <div className="lg:hidden mb-4 sm:mb-6">
              <div className="bg-richblack-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => navigate('/dashboard/enrolled-courses')}
                    className="flex items-center gap-2 text-richblack-100 hover:text-yellow-50 transition-colors duration-200"
                  >
                    <IoIosArrowBack size={20} />
                    <span className="text-sm font-medium">Back to Courses</span>
                  </button>
                  <button
                    onClick={() => setReviewModal(true)}
                    className="bg-yellow-50 text-richblack-900 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-yellow-100 transition-colors duration-200"
                  >
                    Add Review
                  </button>
                </div>
                <div>
                  <h3 className="text-richblack-5 font-semibold text-lg">{courseEntireData?.courseName}</h3>
                  <p className="text-richblack-300 text-sm mt-1">
                    {completedLectures?.length} / {totalNoOfLectures} completed
                  </p>
                </div>
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}

// The <Outlet /> tag in React Router is basically a placeholder where the child route’s component will be rendered inside the parent route’s layout.

// Think of it like saying:
// "I’ll keep a space here in my page, and whatever nested route matches will appear in this space." here used for video details 