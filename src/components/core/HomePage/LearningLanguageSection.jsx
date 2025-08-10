import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../../../components/core/HomePage/Button";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
  return (
    <div>
        <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center my-8 sm:my-10 lg:my-12 leading-tight">
            Your swiss knife for
            <HighlightText text={"learning any language"} />
            <div className="text-center text-richblack-700 font-medium w-[95%] sm:w-[85%] lg:w-[75%] mx-auto leading-relaxed text-sm sm:text-base lg:text-lg mt-4 sm:mt-6">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center mt-6 sm:mt-8 lg:mt-12 gap-4 sm:gap-0">
              <img
                src={Know_your_progress}
                alt=""
                className="object-contain w-full max-w-[280px] sm:max-w-[350px] lg:max-w-none lg:-mr-32"
              />
              <img
                src={Compare_with_others}
                alt=""
                className="object-contain w-full max-w-[280px] sm:max-w-[350px] lg:max-w-none lg:-mb-10 lg:-mt-0 -mt-6 sm:-mt-8 lg:-mt-12"
              />
              <img
                src={Plan_your_lessons}
                alt=""
                className="object-contain w-full max-w-[280px] sm:max-w-[350px] lg:max-w-none lg:-ml-36 lg:-mt-5 -mt-8 sm:-mt-12 lg:-mt-16"
              />
            </div>
          </div>

          <div className="w-full sm:w-fit mx-auto lg:mb-20 mb-8 sm:mb-12 -mt-2 sm:-mt-4 lg:-mt-5">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="">Learn More</div>
            </CTAButton>
          </div>
    </div>
  )
}

export default LearningLanguageSection