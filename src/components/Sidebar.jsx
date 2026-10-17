import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Calendar,
  FileText,
  LayoutDashboard,
  Menu,
  Settings,
  TestTube,
  User,
  Users,
  X,
  ShieldCheck,
  Brain,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const { user, profile, userRole } = useAuth();

  const isActive = (path) => location.pathname === path;

  const getNavItems = () => {
    if (userRole === "doctor") {
      return [
        {
          name: "Dashboard",
          path: `/dashboard/${userRole}`,
          icon: LayoutDashboard,
        },
        {
          name: "AI Detection",
          path: "/detection",
          icon: TestTube,
        },
        {
          name: "Patients",
          path: "/dashboard/doctor/patients",
          icon: Users,
        },
        {
          name: "Test Results",
          path: "/dashboard/doctor/test-results",
          icon: Activity,
        },
        {
          name: "Reports",
          path: "/dashboard/doctor/reports",
          icon: FileText,
        },
      ];
    }

    if (userRole === "patient") {
      return [
        {
          name: "Dashboard",
          path: `/dashboard/${userRole}`,
          icon: LayoutDashboard,
        },
        {
          name: "Results",
          path: "/dashboard/patient/results",
          icon: Activity,
        },
        {
          name: "Reports",
          path: "/dashboard/patient/reports",
          icon: FileText,
        },
        {
          name: "Appointments",
          path: "/dashboard/patient/appointments",
          icon: Calendar,
        },
      ];
    }

    if (userRole === "admin") {
      return [
        {
          name: "Dashboard",
          path: `/dashboard/${userRole}`,
          icon: LayoutDashboard,
        },
        {
          name: "AI Detection",
          path: "/detection",
          icon: TestTube,
        },
        {
          name: "Users",
          path: "/dashboard/admin/users",
          icon: Users,
        },
        {
          name: "Analytics",
          path: "/dashboard/admin/analytics",
          icon: BarChart3,
        },
        {
          name: "System Logs",
          path: "/dashboard/admin/logs",
          icon: Activity,
        },
      ];
    }

    return [
      {
        name: "Dashboard",
        path: `/dashboard/${userRole}`,
        icon: LayoutDashboard,
      },
    ];
  };

  const navItems = getNavItems();

  const settingsPath = `/dashboard/${userRole}/settings`;
  const profilePath = `/dashboard/${userRole}/profile`;

  return (
    <>
      {/* Mobile Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="
          lg:hidden
          fixed
          top-4
          left-4
          z-50
          p-3
          rounded-2xl
          bg-white
          dark:bg-[#0b2423]
          shadow-xl
        "
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#05bdb8]" />
        ) : (
          <Menu className="w-6 h-6 text-[#05bdb8]" />
        )}
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="
              lg:hidden
              fixed
              inset-0
              bg-black/60
              backdrop-blur-sm
              z-30
            "
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative
          top-0 left-0
          z-40
          w-72
          h-screen
          lg:h-[95vh]
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div
          className="
            h-full
            bg-white/90
            dark:bg-[#081c1b]/95
            backdrop-blur-2xl
            border-r
            border-cyan-100
            dark:border-cyan-900
            flex
            flex-col
            overflow-hidden
            shadow-2xl
          "
        >
          {/* Logo */}
          <div className="p-6 border-b border-cyan-100 dark:border-cyan-900">
            <div className="flex items-center gap-3">
              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#02aaa5]
                  to-[#20d7cf]
                  flex
                  items-center
                  justify-center
                  shadow-lg
                "
              >
                <Brain className="w-7 h-7 text-white" />
              </div>

              <div>
                <h2 className="font-black text-xl text-gray-900 dark:text-white">
                  MediVue
                </h2>

                <p className="text-xs text-[#039b97]">
                  AI Clinical Platform
                </p>
              </div>
            </div>
          </div>

          {/* Profile */}
          <Link to={profilePath}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="
                m-4
                p-4
                rounded-3xl
                bg-gradient-to-r
                from-[#effefd]
                to-white
                dark:from-[#082f2d]
                dark:to-[#0b2423]
                border
                border-cyan-100
                dark:border-cyan-900
              "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#05bdb8]
                    to-[#20d7cf]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <User className="w-7 h-7 text-white" />
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {userRole === "doctor"
                      ? `Dr. ${profile?.name || "Doctor"}`
                      : profile?.name ||
                        user?.email?.split("@")[0] ||
                        "User"}
                  </h4>

                  <p className="text-sm text-[#039b97] capitalize">
                    {userRole}
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* AI Status */}
          <div className="px-4 mb-4">
            <div
              className="
                p-4
                rounded-2xl
                bg-[#effefd]
                dark:bg-[#082f2d]
                border
                border-cyan-100
                dark:border-cyan-900
              "
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-green-500" />

                <div>
                  <p className="font-bold text-sm">
                    AI System Online
                  </p>

                  <p className="text-xs text-gray-500">
                    Detection Engine Active
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{
                      x: 5,
                    }}
                    className={`
                      relative
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-2xl
                      transition-all
                      ${
                        isActive(item.path)
                          ? `
                            bg-gradient-to-r
                            from-[#05bdb8]
                            to-[#20d7cf]
                            text-white
                            shadow-lg
                          `
                          : `
                            text-gray-700
                            dark:text-gray-300
                            hover:bg-cyan-50
                            dark:hover:bg-[#082f2d]
                          `
                      }
                    `}
                  >
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeSidebar"
                        className="
                          absolute
                          left-0
                          top-2
                          bottom-2
                          w-1
                          rounded-full
                          bg-white
                        "
                      />
                    )}

                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">
                      {item.name}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="p-4 border-t border-cyan-100 dark:border-cyan-900">
            <Link to={settingsPath}>
              <motion.div
                whileHover={{ x: 5 }}
                className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-2xl
                  hover:bg-cyan-50
                  dark:hover:bg-[#082f2d]
                "
              >
                <Settings className="w-5 h-5 text-[#05bdb8]" />
                <span className="font-medium">
                  Settings
                </span>
              </motion.div>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;