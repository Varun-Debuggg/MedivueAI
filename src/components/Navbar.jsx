import { AnimatePresence, motion } from "framer-motion";
import { Activity, Menu, Moon, Sun, X, Microscope, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { isAuthenticated, user, profile, userRole, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Detection", path: "/detection" },
    { name: "Reports", path: "/public-reports" },
    ...(isAuthenticated && userRole
      ? [{ name: "Dashboard", path: `/dashboard/${userRole}` }]
      : []),
  ];

  const displayName =
    user?.name ||
    profile?.name ||
    user?.email ||
    profile?.email ||
    "User";

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-100/80 dark:border-cyan-950/80 bg-white/85 dark:bg-[#071616]/90 backdrop-blur-2xl shadow-sm">
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#20d7cf] to-transparent opacity-70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.05 }}
              transition={{ duration: 0.65 }}
              className="relative bg-gradient-to-br from-[#04bdb7] via-[#18d6cf] to-[#91fff7] p-3 rounded-2xl shadow-lg shadow-cyan-500/20"
            >
              <Activity className="w-6 h-6 text-white" />
              <span className="absolute -right-1 -top-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#071616]" />
            </motion.div>

            <div className="flex flex-col leading-tight">
              <span className="text-xl font-display font-extrabold bg-gradient-to-r from-[#039b97] via-[#0fcac4] to-[#36e7dc] bg-clip-text text-transparent">
                Medivue AI
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:flex items-center gap-1">
                <Microscope className="w-3 h-3" />
                Smart malaria screening
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center rounded-full bg-cyan-50/80 dark:bg-cyan-950/25 border border-cyan-100 dark:border-cyan-900 p-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-[#039b97] dark:hover:text-[#2ee9df]"
                }`}
              >
                {isActive(link.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#02aaa5] to-[#20d7cf] shadow-md shadow-cyan-500/20"
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-[#039b97]" />
              )}
            </motion.button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-2xl bg-white dark:bg-[#0b2221] border border-cyan-100 dark:border-cyan-900">
                  <ShieldCheck className="w-4 h-4 text-[#08aaa5]" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[130px] truncate">
                    {displayName}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="px-4 py-2.5 rounded-2xl text-sm font-bold text-[#037e7a] dark:text-[#54f3ea] border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 transition-colors"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2.5 rounded-2xl text-sm font-bold text-[#037e7a] dark:text-[#54f3ea] border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 transition-colors"
                  >
                    Login
                  </motion.button>
                </Link>

                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-[#02aaa5] to-[#20d7cf] shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/35 transition-all"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900 text-[#039b97] dark:text-[#2ee9df]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-cyan-100 dark:border-cyan-900"
          >
            <div className="px-4 py-4 space-y-3 bg-white/95 dark:bg-[#071616]/95 backdrop-blur-xl">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-2xl font-semibold transition-colors ${
                    isActive(link.path)
                      ? "bg-gradient-to-r from-[#02aaa5] to-[#20d7cf] text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/30"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-cyan-100 dark:border-cyan-900 space-y-3">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-cyan-50 dark:hover:bg-cyan-950/30 text-gray-700 dark:text-gray-300"
                >
                  <span className="font-semibold">Theme</span>
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-[#039b97]" />
                  )}
                </button>

                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/30 text-sm text-gray-600 dark:text-gray-400">
                      Logged in as <strong>{displayName}</strong>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full px-4 py-3 rounded-2xl font-bold text-[#037e7a] dark:text-[#54f3ea] border border-cyan-200 dark:border-cyan-800"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <button className="w-full px-4 py-3 rounded-2xl font-bold text-[#037e7a] dark:text-[#54f3ea] border border-cyan-200 dark:border-cyan-800">
                        Login
                      </button>
                    </Link>

                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <button className="w-full px-4 py-3 rounded-2xl font-extrabold text-white bg-gradient-to-r from-[#02aaa5] to-[#20d7cf]">
                        Get Started
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;