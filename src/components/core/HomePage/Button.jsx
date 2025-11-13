import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 w-full sm:w-auto ${
          active 
            ? "bg-yellow-50 text-richblack-900 hover:bg-yellow-100 shadow-lg" 
            : "bg-richblack-800 text-richblack-5 hover:bg-richblack-700 border border-richblack-600 hover:border-richblack-500"
        }`}
      >
        {children}
      </div>
    </Link>
  );
};
export default Button;
