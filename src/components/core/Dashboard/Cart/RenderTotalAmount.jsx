import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI"
import IconBtn from "../../../Common/IconBtn"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    BuyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="w-full lg:min-w-[280px] lg:max-w-[320px] rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:p-6 sticky top-4">
      <p className="mb-2 text-sm sm:text-base font-semibold text-richblack-300">Total:</p>
      <p className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-yellow-100">₹ {total}</p>
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center text-base sm:text-lg py-3 sm:py-4"
      />
    </div>
  )
}
