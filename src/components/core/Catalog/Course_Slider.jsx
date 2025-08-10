import React from "react"
// Import Swiper and its slide component
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper core CSS
import "swiper/css"
// Optional modules' CSS
import "swiper/css/free-mode"     // For free movement between slides
import "swiper/css/pagination"    // For pagination dots

// Import Swiper modules
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper"

// Import Course card component to render each course
import Course_Card from "./Course_Card"

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {/* Check if courses are available */}
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}        // On small screens, show 1 slide at a time
          spaceBetween={25}       // Space between slides
          loop={true}             // Slides loop infinitely
          modules={[FreeMode, Pagination]}  // Enable FreeMode and Pagination features
          breakpoints={{
            // On screens ≥ 1024px, show 3 slides at once
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"  // Limit slider height
        >
          {/* Render each course in a slide */}
          {Courses.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // If no course found, show this message
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
