import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8">
        <div className="border-b w-full flex flex-col lg:flex-row pb-6 sm:pb-8 lg:pb-5 border-richblack-700">
          {/* Section 1 */}
          <div className="w-full lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 lg:pr-8 gap-6 sm:gap-8">
            <div className="w-full sm:w-[45%] lg:w-[30%] flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-7">
              <h1 className="text-richblack-50 font-bold text-lg sm:text-xl">
                Company
              </h1>
              <div className="flex flex-col gap-2 sm:gap-3">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-sm sm:text-base cursor-pointer hover:text-richblack-50 transition-all duration-200 hover:translate-x-1"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 sm:gap-4 text-lg sm:text-xl mt-2 sm:mt-4">
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%] mb-6 sm:mb-8 lg:mb-7">
              <h1 className="text-richblack-50 font-bold text-lg sm:text-xl">
                Resources
              </h1>

              <div className="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-4">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-sm sm:text-base cursor-pointer hover:text-richblack-50 transition-all duration-200 hover:translate-x-1"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="text-richblack-50 font-bold text-lg sm:text-xl mt-6 sm:mt-8">
                Support
              </h1>
              <div className="text-sm sm:text-base cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-3 sm:mt-4 hover:translate-x-1">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="w-full sm:w-[45%] lg:w-[30%] mb-6 sm:mb-8 lg:mb-7">
              <h1 className="text-richblack-50 font-bold text-lg sm:text-xl">
                Plans
              </h1>

              <div className="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-4">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-sm sm:text-base cursor-pointer hover:text-richblack-50 transition-all duration-200 hover:translate-x-1"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="text-richblack-50 font-bold text-lg sm:text-xl mt-6 sm:mt-8">
                Community
              </h1>

              <div className="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-4">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-sm sm:text-base cursor-pointer hover:text-richblack-50 transition-all duration-200 hover:translate-x-1"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="w-full lg:w-[50%] flex flex-wrap flex-row justify-between lg:pl-8 gap-6 sm:gap-8">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-full sm:w-[45%] lg:w-[30%] mb-6 sm:mb-8 lg:mb-7">
                  <h1 className="text-richblack-50 font-bold text-lg sm:text-xl">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-4">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-sm sm:text-base cursor-pointer hover:text-richblack-50 transition-all duration-200 hover:translate-x-1"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-8 sm:pb-12 lg:pb-14 text-sm sm:text-base px-4 sm:px-6 lg:px-8 gap-4 sm:gap-0">
        {/* Section 1 */}
        <div className="flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "sm:border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-2 sm:px-3 py-1 sm:py-0`}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center font-medium">Made with ❤️ AMBAR - LearnLoop</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
