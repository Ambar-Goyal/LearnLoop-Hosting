import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../Common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  // ------------------- STATE -------------------
  const [activeStatus, setActiveStatus] = useState("") // Which SECTION is currently expanded (only 1 at a time)
  const [videoBarActive, setVideoBarActive] = useState("") // Which VIDEO (sub-section) is currently active/highlighted

  // ------------------- HOOKS -------------------
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams() // Getting section/sub-section from URL

  // Getting course data from Redux store
  const {
    courseSectionData, // All sections + their sub-sections
    courseEntireData, // Full course details (name, etc.)
    totalNoOfLectures, // Total lectures count
    completedLectures, // Array of completed lecture IDs
  } = useSelector((state) => state.viewCourse)

  // ------------------- USE EFFECT -------------------
  useEffect(() => {
    ;(() => {
      // Safety: if no data yet, do nothing
      if (!courseSectionData.length) return

      // 1️⃣ Find which section is currently open from URL
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

      // 2️⃣ Find which sub-section (video) is currently active from URL
      const currentSubSectionIndx =
        courseSectionData?.[currentSectionIndx]?.subSection.findIndex(
          (data) => data._id === subSectionId
        )

      // 3️⃣ Extract the actual active sub-section ID
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id

      // 4️⃣ Update state to highlight the section and the specific video
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    // Re-run when data changes OR when URL changes
  }, [courseSectionData, courseEntireData, location.pathname])

  // ------------------- RENDER -------------------
  return (
    <>
      <div className="hidden lg:flex h-[calc(100vh-3.5rem)] w-[280px] xl:w-[320px] max-w-[350px] flex-col border-r border-r-richblack-700 bg-richblack-800">

        {/* ---------------- HEADER (Back + Review Button + Stats) ---------------- */}
        <div className="mx-4 xl:mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-4 xl:py-5 text-base xl:text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            
            {/* Back button to Enrolled Courses */}
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-8 w-8 xl:h-[35px] xl:w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 transition-transform duration-200"
              title="Back"
            >
              <IoIosArrowBack size={20} className="xl:text-[30px]" />
            </div>

            {/* Add Review Button */}
            <IconBtn
              text="Add Review"
              customClasses="ml-auto text-xs xl:text-sm px-3 xl:px-4 py-2"
              onclick={() => setReviewModal(true)}
            />
          </div>

          {/* Course Name + Progress */}
          <div className="flex flex-col">
            <p className="text-sm xl:text-base font-semibold truncate">{courseEntireData?.courseName}</p>
            <p className="text-xs xl:text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* ---------------- COURSE SECTIONS + SUB-SECTIONS ---------------- */}
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-xs xl:text-sm text-richblack-5"
              // Clicking a section title will open ONLY that section (collapse others)
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* ---------- Section Row ---------- */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-4 xl:px-7 py-4 xl:py-6 transition-all duration-300 hover:bg-richblack-700`}
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>

                {/* Arrow Icon (rotates if active) */}
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      activeStatus === course?._id
                  <p className="font-medium">{course?.sectionName}</p>
                        : "rotate-180"
                    } transition-all duration-500`}
                  <span className="text-yellow-25 text-xs xl:text-sm">
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* ---------- Sub-Sections (Videos) ---------- */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                <div className="text-textHead flex flex-col gap-2 px-4 xl:px-7 py-4 xl:py-6 font-semibold">
                    <div
                      className={`flex gap-3  px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800" // Highlight current video
                          : "hover:bg-richblack-900"
                      } `}
                      key={i}
                      onClick={() => {
                        // Navigate to clicked video
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id) // Highlight it
                      }}
                    >
                      {/* Completion Checkbox */}
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/**
 * TL;DR:
 * - Only one section is expanded at a time → managed by activeStatus
 * - Clicking a section name expands it & collapses others
 * - Clicking a video highlights it (yellow) → managed by videoBarActive
 * - URL params decide initial active section & video
 * - Progress bar = completedLectures / totalNoOfLectures
 */
