import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropdown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        if (res.data.data) {
          setSubLinks(res.data.data)
        }
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-16 sm:h-18 lg:h-20 items-center justify-center border-b border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-300 sticky top-0 z-50 backdrop-blur-sm`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/">
          <div className="text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-[#00C9FF] via-[#92FE9D] to-[#38F9D7] text-transparent bg-clip-text font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-200">
            LearnLoop
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-4 lg:gap-x-8 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-richblack-700 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p className="font-medium">{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[250px] lg:w-[320px] translate-x-[-50%] translate-y-[3em] flex-col rounded-xl bg-richblack-5 p-6 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 shadow-2xl">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center py-4">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.courses?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-3 px-4 hover:bg-richblack-50 transition-all duration-200 font-medium"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center py-4">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-richblack-700 ${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-3 lg:gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl lg:text-3xl text-richblack-100 hover:text-yellow-50 transition-colors duration-200" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-yellow-50 text-center text-xs font-bold text-richblack-900 animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {user && user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Link to="/quiz" className="relative">
              <span className="text-richblack-100 hover:text-yellow-25 transition-colors">
                Quiz
              </span>
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-2 lg:px-6 lg:py-3 text-richblack-100 font-medium transition-all duration-200 hover:bg-richblack-700 hover:border-richblack-600 hover:scale-105">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-lg bg-yellow-50 px-4 py-2 lg:px-6 lg:py-3 text-richblack-900 font-semibold transition-all duration-200 hover:bg-yellow-100 hover:scale-105 shadow-lg hover:shadow-xl">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-richblack-700 transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-richblack-800 border-b border-richblack-700 md:hidden z-40">
          <div className="flex flex-col p-4 space-y-4">
            {/* Navigation Links */}
            {NavbarLinks.map((link, index) => (
              <div key={index}>
                {link.title === "Catalog" ? (
                  <div className="space-y-2">
                    <p className="text-richblack-25 font-medium py-2">{link.title}</p>
                    <div className="pl-4 space-y-2">
                      {loading ? (
                        <p className="text-richblack-300 text-sm">Loading...</p>
                      ) : subLinks.length ? (
                        subLinks
                          ?.filter((subLink) => subLink?.courses?.length > 0)
                          ?.map((subLink, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="block text-richblack-300 text-sm py-1 hover:text-yellow-25 transition-colors duration-200"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subLink.name}
                            </Link>
                          ))
                      ) : (
                        <p className="text-richblack-300 text-sm">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link 
                    to={link?.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <p className={`py-2 font-medium transition-colors duration-200 ${
                      matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25 hover:text-yellow-25"
                    }`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </div>
            ))}

            {/* Cart for mobile */}
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link 
                to="/dashboard/cart" 
                className="flex items-center gap-2 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <AiOutlineShoppingCart className="text-xl text-richblack-100" />
                <span className="text-richblack-25 font-medium">
                  Cart {totalItems > 0 && `(${totalItems})`}
                </span>
              </Link>
            )}

            {/* Auth buttons for mobile */}
            {token === null && (
              <div className="flex flex-col space-y-3 pt-4 border-t border-richblack-700">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3 text-richblack-100 font-medium transition-all duration-200 hover:bg-richblack-700">
                    Log in
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="w-full rounded-lg bg-yellow-50 px-4 py-3 text-richblack-900 font-semibold transition-all duration-200 hover:bg-yellow-100">
                    Sign up
                  </button>
                </Link>
              </div>
            )}

            {/* Profile for mobile */}
            {token !== null && (
              <div className="pt-4 border-t border-richblack-700">
                <Link 
                  to="/dashboard/my-profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2"
                >
                  <img
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-richblack-25 font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default Navbar
