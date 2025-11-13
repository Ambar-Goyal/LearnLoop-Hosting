import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)
  const { paymentLoading } = useSelector((state) => state.course)

  if (paymentLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="spinner"></div>
      </div>
    )

  return (
    <>
      <h1 className="mb-8 sm:mb-12 lg:mb-14 text-2xl sm:text-3xl font-bold text-richblack-5">Cart</h1>
      <p className="border-b border-b-richblack-400 pb-2 sm:pb-3 font-semibold text-richblack-400 text-sm sm:text-base">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-6 sm:mt-8 flex flex-col-reverse items-start gap-x-6 lg:gap-x-10 gap-y-6 sm:gap-y-8 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-8 sm:mt-12 lg:mt-14 text-center text-xl sm:text-2xl lg:text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}
    </>
  )
}
