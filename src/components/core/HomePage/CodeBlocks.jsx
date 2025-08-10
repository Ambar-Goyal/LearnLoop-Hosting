import React from "react";
import CTAButton from "./Button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-12 sm:my-16 lg:my-20 justify-between flex-col gap-8 sm:gap-10 lg:gap-12 xl:gap-16`}>

      {/* Section 1  */}
      <div className="w-full lg:w-[50%] flex flex-col gap-6 sm:gap-8">
        {heading}

        {/* Sub Heading */}
        <div className="text-richblack-300 text-sm sm:text-base lg:text-lg font-medium w-[95%] sm:w-[90%] lg:w-[85%] leading-relaxed">
          {subheading}
        </div>

        {/* Button Group */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="h-fit code-border flex flex-row py-3 sm:py-4 text-xs sm:text-sm lg:text-base leading-5 sm:leading-6 relative w-full max-w-[400px] sm:max-w-[500px] lg:w-[470px] mx-auto lg:mx-0 rounded-xl overflow-hidden">
        {backgroundGradient}
        {/* Indexing */}
        <div className="text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold text-xs sm:text-sm">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        {/* Codes */}
        <div
          className={`w-[90%] flex flex-col gap-1 sm:gap-2 font-bold font-mono ${codeColor} pr-2 sm:pr-4 text-xs sm:text-sm lg:text-base`}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
