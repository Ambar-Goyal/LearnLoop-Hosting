import React from "react";

// Importing React Icons
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div
      className={`w-full sm:w-[320px] lg:w-[30%] max-w-[360px] ${
        currentCard === cardData?.heading
          ? "bg-white shadow-[8px_8px_0_0] sm:shadow-[12px_12px_0_0] shadow-yellow-50 scale-105"
          : "bg-richblack-800"
      } text-richblack-25 h-[280px] sm:h-[300px] box-border cursor-pointer transition-all duration-300 hover:scale-105 rounded-xl overflow-hidden`}
      onClick={() => setCurrentCard(cardData?.heading)}
    >
      <div className="border-b-2 border-richblack-400 border-dashed h-[80%] p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
        <div
          className={`${
            currentCard === cardData?.heading && "text-richblack-800"
          } font-bold text-lg sm:text-xl leading-tight`}
        >
          {cardData?.heading}
        </div>

        <div className={`text-sm sm:text-base leading-relaxed ${
          currentCard === cardData?.heading ? "text-richblack-600" : "text-richblack-400"
        }`}>
          {cardData?.description}
        </div>
      </div>

      <div
        className={`flex justify-between ${
          currentCard === cardData?.heading ? "text-blue-300" : "text-richblack-300"
        } px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base`}
      >
        {/* Level */}
        <div className="flex items-center gap-1 sm:gap-2">
          <HiUsers />
          <p>{cardData?.level}</p>
        </div>

        {/* Flow Chart */}
        <div className="flex items-center gap-1 sm:gap-2">
          <ImTree />
          <p>{cardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
