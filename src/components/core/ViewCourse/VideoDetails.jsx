import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useLocation } from "react-router-dom"

import "video-react/dist/video-react.css"
import { BigPlayButton, Player } from "video-react"

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from "../../Common/IconBtn"

const VideoDetails = () => {
  // ------------------ ROUTE PARAMS ------------------
  // These come from the URL: /view-course/:courseId/section/:sectionId/sub-section/:subSectionId
  const { courseId, sectionId, subSectionId } = useParams()

  // Navigation helpers
  const navigate = useNavigate()
  const location = useLocation()

  // ------------------ useRef ------------------
  // Create a reference to the video player instance.
  // This allows direct access to player methods (like .seek(0) for rewatch) 
  // without causing re-renders.
  const playerRef = useRef(null)

  // ------------------ REDUX ------------------
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  // ------------------ LOCAL STATE ------------------
  const [videoData, setVideoData] = useState([])         // Current video's details (title, desc, URL, etc.)
  const [previewSource, setPreviewSource] = useState("") // Fallback image if video not loaded
  const [videoEnded, setVideoEnded] = useState(false)    // Tracks if video finished playing
  const [loading, setLoading] = useState(false)          // Loading state for marking completion

  // ------------------ LOAD CURRENT VIDEO ------------------
  useEffect(() => {
    (async () => {
      // Exit early if course content not yet loaded
      if (!courseSectionData.length) return

      // If params are missing, redirect to enrolled courses page
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        // Find the section that matches sectionId
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )

        // Find the subSection (video) matching subSectionId
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        )

        // Store this video's data in state
        setVideoData(filteredVideoData[0])

        // Set preview image in case video fails to load
        setPreviewSource(courseEntireData.thumbnail)

        // Reset video-ended state
        setVideoEnded(false)
      }
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  // ------------------ FIRST VIDEO CHECK (first video of first section of that course------------------
  // Used to disable "Prev" button on the very first video of the course
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndx = courseSectionData[currentSectionIndx]
      .subSection.findIndex((data) => data._id === subSectionId)

    return currentSectionIndx === 0 && currentSubSectionIndx === 0
  }

  // ------------------ NAVIGATE TO NEXT VIDEO either the next of that section or if we are at last in a section go to first video of next section ------------------
  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[currentSectionIndx]
      .subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      // Go to next video in the same section
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      // Go to first video of the next section
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  // ------------------ LAST VIDEO CHECK(last video of last section of that course) ------------------
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[currentSectionIndx]
      .subSection.findIndex((data) => data._id === subSectionId)

    return (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    )
  }

  // ------------------ NAVIGATE TO PREVIOUS VIDEO ------------------
  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndx = courseSectionData[currentSectionIndx]
      .subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      // Go to previous video in the same section
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      // Go to last video of the previous section
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  // ------------------ MARK LECTURE COMPLETION ------------------
  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      // Update Redux state so cariable UI reflects completion immediately
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-5 text-white">
      {/* Show preview image if no video yet */}
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        // --------------------VIDEO PLAYER used from the react hereeee---------------------
        <Player
          ref={playerRef} // This lets us control the player (rewatch, seek, etc.)
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />

          {/* Overlay shown when video finishes */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {/* Mark As Completed button (only if not already done else nhi dikhana if already marked) */}
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={handleLectureCompletion}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}

              {/* Rewatch button → uses playerRef to restart video */}
              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    playerRef.current.seek(0) // Restart video from beginning
                    setVideoEnded(false)
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />

              {/* Navigation buttons */}
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      {/* ------------------ VIDEO DETAILS ------------------ */}
      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails
