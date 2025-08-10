import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper's required CSS files
import "swiper/css"               // Base Swiper styles
import "swiper/css/free-mode"     // Styles for free scrolling mode
import "swiper/css/pagination"    // Styles for pagination (dots)

// Global styles (your own app styles)
import "../../App.css"

import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode, Pagination } from "swiper" // Swiper modules for extra features

import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([]) // Store all reviews fetched from API

  useEffect(() => {
    // Immediately invoked async function to fetch reviews
    ;(async () => {
      try {
        const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
        if (data?.success) {
          setReviews(data?.data) // Update state with fetched reviews
        }
      } catch (err) {
        console.log("Error fetching reviews:", err)
      }
    })()
  }, [])

  return (
    <div className="w-full px-4">
      {/* If there are no reviews, show message */}
      {reviews.length === 0 ? (
        <div className="text-white text-center py-10">No reviews available</div>
      ) : (
        <Swiper
          // --- Swiper Core Settings ---
          spaceBetween={20}      // Space in px between each slide
          loop={true}            // Allows infinite scrolling of slides
          freeMode={true}        // Enables free scrolling without snapping exactly to slide edges
          observer={true}        // Reinitializes Swiper if its elements change
          observeParents={true}  // Reinitializes Swiper if its parent container size changes

          // --- Autoplay Settings ---
          autoplay={{
            delay: 3000,              // Delay between slide transitions (3 seconds)
            disableOnInteraction: false // Keep autoplay running even if user interacts/swipes
          }}

          // --- Pagination Settings ---
          pagination={{ clickable: true }} // Shows clickable navigation dots under slider

          // --- Responsive Breakpoints ---
          breakpoints={{
            // Screen widths in px : slidesPerView value
            320: { slidesPerView: 1 },                         // Mobile small
            640: { slidesPerView: 1 },                         // Mobile large
            768: { slidesPerView: 2 },                         // Tablet
            1024: { slidesPerView: 3 },                        // Laptop
            1280: { slidesPerView: Math.min(4, reviews.length) } // Large screen, max 4 slides or total reviews
          }}

          // --- Modules Used ---
          modules={[FreeMode, Pagination, Autoplay]} // Extra functionality for free scroll, dots, and autoplay

          className="w-full" // Tailwind class for full width
        >
          {/* Mapping each review into a Swiper slide */}
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              {/* Slide Content */}
              <div className="h-full w-full bg-richblack-800 p-4 rounded-lg flex flex-col gap-4 text-white">

                {/* Reviewer Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      review.user.image
                        ? review.user.image // User profile image if exists
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review.user.firstName} ${review.user.lastName}` // Fallback avatar with initials
                    }
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-richblack-5">
                      {review.user.firstName} {review.user.lastName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {review.course.courseName}
                    </p>
                  </div>
                </div>

                {/* Review Text (truncate if too long) */}
                <p className="text-sm text-richblack-25 leading-relaxed">
                  {review.review.length > 80
                    ? `${review.review.slice(0, 80)}...`
                    : review.review}
                </p>

                {/* Rating Section */}
                <div className="flex items-center gap-2 mt-auto">
                  {/* Numeric Rating */}
                  <span className="text-amber-400 font-semibold">
                    {review.rating.toFixed(1)}
                  </span>

                  {/* Star Rating */}
                  <ReactStars
                    count={5}          // Total stars
                    value={review.rating} // Current rating
                    size={20}          // Size of stars
                    edit={false}       // Read-only stars
                    activeColor="#FBBF24" // Filled star color
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default ReviewSlider
