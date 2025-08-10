import React from 'react'
import CTAButton from "../../../components/core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from './HighlightText';

const InstructorSection = () => {
  return (
    <div>
        <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-20 items-center">
          <div className="w-full lg:w-[50%] order-2 lg:order-1">
            <img
              src={Instructor}
              alt=""
              className="shadow-white shadow-[-10px_-10px_0_0] sm:shadow-[-20px_-20px_0_0] w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto rounded-2xl"
            />
          </div>
          <div className="w-full lg:w-[50%] flex gap-6 sm:gap-8 lg:gap-10 flex-col order-1 lg:order-2 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              Become an
              <HighlightText text={"instructor"} />
            </h1>

            <p className="font-medium text-sm sm:text-base lg:text-lg text-center lg:text-left w-full lg:w-[90%] text-richblack-300 leading-relaxed">
              Instructors from around the world teach millions of students on
              LearnLoop. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-full sm:w-fit mx-auto lg:mx-0">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
    </div>
  )
}

export default InstructorSection