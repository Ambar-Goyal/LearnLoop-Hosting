import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../Common/IconBtn"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <>
      <h1 className="mb-8 sm:mb-12 lg:mb-14 text-2xl sm:text-3xl font-bold text-richblack-5">
        My Profile
      </h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:p-6 lg:p-8 gap-4 sm:gap-0">
        <div className="flex items-center gap-x-3 sm:gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-16 sm:w-20 lg:w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-base sm:text-lg lg:text-xl font-bold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          customClasses="w-full sm:w-auto"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-6 sm:my-8 lg:my-10 flex flex-col gap-y-6 sm:gap-y-8 lg:gap-y-10 rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:p-6 lg:p-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-base sm:text-lg lg:text-xl font-bold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            customClasses="text-sm"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm sm:text-base font-medium leading-relaxed`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-6 sm:my-8 lg:my-10 flex flex-col gap-y-6 sm:gap-y-8 lg:gap-y-10 rounded-xl border border-richblack-700 bg-richblack-800 p-4 sm:p-6 lg:p-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            customClasses="text-sm"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex flex-col sm:flex-row max-w-full sm:max-w-[500px] justify-between gap-6 sm:gap-8">
          <div className="flex flex-col gap-y-4 sm:gap-y-5 flex-1">
            <div>
              <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-richblack-600 font-medium">First Name</p>
              <p className="text-sm sm:text-base font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-richblack-600 font-medium">Email</p>
              <p className="text-sm sm:text-base font-medium text-richblack-5 break-all">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-richblack-600 font-medium">Gender</p>
              <p className="text-sm sm:text-base font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 sm:gap-y-5 flex-1">
            <div>
              <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-richblack-600 font-medium">Last Name</p>
              <p className="text-sm sm:text-base font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-richblack-600 font-medium">Phone Number</p>
              <p className="text-sm sm:text-base font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-richblack-600 font-medium">Date Of Birth</p>
              <p className="text-sm sm:text-base font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
