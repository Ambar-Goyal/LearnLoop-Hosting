import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-8 sm:gap-y-12 py-8 sm:py-12 md:flex-row md:gap-y-0 md:gap-x-8 lg:gap-x-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[450px] md:mx-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-richblack-5">
              {title}
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-full max-w-[350px] sm:max-w-[450px] md:mx-0">
            <img
              src={frameImg}
              alt="Pattern"
              className="w-full h-auto"
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              className="absolute -top-2 sm:-top-4 right-2 sm:right-4 z-10 w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template
