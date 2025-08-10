import React from "react";
import TimeLineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const TimeLine = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];


const TimelineSection = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-20 mb-12 sm:mb-16 lg:mb-20 items-center">
        <div className="w-full lg:w-[45%] flex flex-col gap-8 sm:gap-12 lg:gap-14 xl:gap-3">
          {TimeLine.map((ele, i) => {
            return (
              <div className="flex flex-col gap-2 lg:gap-3" key={i}>
                <div className="flex gap-4 sm:gap-6 items-start" key={i}>
                  <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0] flex-shrink-0">
                    <img src={ele.Logo} alt="" className="w-6 h-6 sm:w-auto sm:h-auto" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-lg sm:text-xl lg:text-2xl text-richblack-800 leading-tight">{ele.Heading}</h2>
                    <p className="text-sm sm:text-base lg:text-lg text-richblack-700 mt-1 sm:mt-2 leading-relaxed">{ele.Description}</p>
                  </div>
                </div>
                <div
                  className={`hidden ${
                    TimeLine.length - 1 === i ? "hidden" : "lg:block"
                  } h-8 sm:h-12 lg:h-14 border-dotted border-r-2 border-richblack-200 bg-richblack-400/0 w-[26px] ml-6 sm:ml-[26px]`}
                ></div>
              </div>
            );
          })}
        </div>
        <div className="relative w-full lg:w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px] rounded-2xl overflow-hidden">
          <div className="absolute left-[50%] bottom-0 translate-x-[-50%] translate-y-[50%] bg-caribbeangreen-700 flex flex-col sm:flex-row lg:flex-row text-white uppercase py-4 sm:py-6 lg:py-8 xl:py-10 gap-4 sm:gap-6 lg:gap-0 rounded-xl shadow-2xl min-w-[280px] sm:min-w-[400px]">
            {/* Section 1 */}
            <div className="flex gap-3 sm:gap-4 lg:gap-5 items-center lg:border-r border-caribbeangreen-300 px-4 sm:px-6 lg:px-8 xl:px-14 justify-center lg:justify-start">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold w-12 sm:w-16 lg:w-[75px] text-center">10</h1>
              <h1 className="text-caribbeangreen-300 text-xs sm:text-sm lg:text-base w-16 sm:w-20 lg:w-[75px] leading-tight">
                Years experiences
              </h1>
            </div>

            {/* Section 2 */}
            <div className="flex gap-3 sm:gap-4 lg:gap-5 items-center px-4 sm:px-6 lg:px-8 xl:px-14 justify-center lg:justify-start">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold w-12 sm:w-16 lg:w-[75px] text-center">250</h1>
              <h1 className="text-caribbeangreen-300 text-xs sm:text-sm lg:text-base w-16 sm:w-20 lg:w-[75px] leading-tight">
                types of courses
              </h1>
            </div>
          </div>
          <img
            src={TimeLineImage}
            alt="timelineImage"
            className="shadow-white shadow-[10px_10px_0px_0px] sm:shadow-[20px_20px_0px_0px] object-cover h-[300px] sm:h-[400px] lg:h-fit w-full lg:w-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
