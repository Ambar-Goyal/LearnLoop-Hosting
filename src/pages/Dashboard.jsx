import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto md:ml-0">
        <div className="mx-auto w-11/12 max-w-[1000px] py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
          {/* Mobile sidebar toggle for smaller screens */}
          <div className="md:hidden mb-6">
            <div className="flex flex-wrap gap-2 p-4 bg-richblack-800 rounded-lg">
              {sidebarLinks.map((link) => {
                if (link.type && user?.accountType !== link.type) return null
                return (
                  <Link
                    key={link.id}
                    to={link.path}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      matchPath({ path: link.path }, location.pathname)
                        ? "bg-yellow-800 text-yellow-50"
                        : "text-richblack-300 hover:bg-richblack-700 hover:text-richblack-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
