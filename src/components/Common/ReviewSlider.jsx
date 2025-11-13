import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";
import { FaStar } from "react-icons/fa";
import { Autoplay, FreeMode, Pagination } from "swiper";
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );

        if (data?.success) {
          const validReviews = data.data.filter(
            (r) => r.user && r.course
          );
          setReviews(validReviews);
        }
      } catch (err) {
        console.log("Error fetching reviews:", err);
      }
    })();
  }, []);

  if (reviews.length === 0) {
    return (
      <div className="text-white text-center py-10">
        No reviews available
      </div>
    );
  }

  return (
    <div className="w-full px-4">
      <Swiper
        spaceBetween={20}
        loop={true}
        freeMode={true}
        observer={true}
        observeParents={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: Math.min(4, reviews.length) },
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="w-full"
      >
        {reviews.map((review, i) => (
          <SwiperSlide key={i}>
            <div className="h-full w-full bg-richblack-800 p-4 rounded-lg flex flex-col gap-4 text-white">
              <div className="flex items-center gap-3">
                <img
                  src={
                    review.user.image
                      ? review.user.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review.user.firstName} ${review.user.lastName}`
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

              <p className="text-sm text-richblack-25 leading-relaxed">
                {review.review.length > 80
                  ? `${review.review.slice(0, 80)}...`
                  : review.review}
              </p>

              <div className="flex items-center gap-2 mt-auto">
                <span className="text-amber-400 font-semibold">
                  {review.rating.toFixed(1)}
                </span>
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={20}
                  edit={false}
                  activeColor="#FBBF24"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ReviewSlider;
