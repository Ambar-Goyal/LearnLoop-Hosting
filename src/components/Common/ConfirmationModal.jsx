import IconBtn from "./IconBtn"

export default function ConfirmationModal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] sm:max-w-[400px] rounded-xl border border-richblack-400 bg-richblack-800 p-4 sm:p-6 mx-4">
        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 sm:mt-4 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-x-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            customClasses="w-full sm:w-auto"
          />
          <button
            className="cursor-pointer rounded-lg bg-richblack-200 py-3 px-6 font-semibold text-richblack-900 transition-all duration-200 hover:bg-richblack-300 w-full sm:w-auto"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}
