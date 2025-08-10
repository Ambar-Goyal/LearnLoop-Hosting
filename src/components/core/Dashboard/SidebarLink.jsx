import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"

export default function SidebarLink({ link, iconName }) {
  const Icon = Icons[iconName]
  const location = useLocation()//for changing the background colot of tag jis bhi path pe ho 
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetCourseState())}
      className={`relative px-6 lg:px-8 py-2 lg:py-3 text-sm lg:text-base font-medium transition-all duration-200 rounded-lg mx-2 ${
        matchRoute(link.path)
          ? "bg-yellow-800 text-yellow-50 shadow-lg"
          : "bg-opacity-0 text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-1 bg-yellow-50 rounded-r-full transition-opacity duration-200 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg lg:text-xl" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}
