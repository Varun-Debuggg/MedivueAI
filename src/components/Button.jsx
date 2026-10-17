import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "relative overflow-hidden font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-4";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#02aaa5] via-[#12cfc7] to-[#20d7cf] text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/35 focus:ring-cyan-300",
    secondary:
      "bg-white text-[#039b97] border border-cyan-100 hover:bg-[#effefd] shadow-md hover:shadow-lg focus:ring-cyan-100 dark:bg-[#0b2423] dark:text-[#5af7ee] dark:border-cyan-900 dark:hover:bg-[#103532]",
    outline:
      "bg-transparent border-2 border-[#05bdb8] text-[#039b97] hover:bg-[#effefd] hover:border-[#20d7cf] focus:ring-cyan-100 dark:text-[#5af7ee] dark:hover:bg-cyan-950/30",
    ghost:
      "bg-transparent text-gray-700 hover:bg-cyan-50 hover:text-[#039b97] focus:ring-cyan-100 dark:text-gray-300 dark:hover:bg-cyan-950/30 dark:hover:text-[#5af7ee]",
    danger:
      "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/20 hover:shadow-xl focus:ring-red-300",
    success:
      "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl focus:ring-emerald-300",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={
        !isDisabled
          ? {
              scale: 1.035,
              y: -2,
            }
          : {}
      }
      whileTap={
        !isDisabled
          ? {
              scale: 0.96,
              y: 0,
            }
          : {}
      }
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 22,
      }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        isDisabled ? "opacity-50 cursor-not-allowed shadow-none" : ""
      } ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {/* Shine animation */}
      {!isDisabled && variant === "primary" && (
        <motion.span
          initial={{ x: "-120%" }}
          whileHover={{ x: "130%" }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg]"
        />
      )}

      {/* Soft pulse glow */}
      {!isDisabled && (variant === "primary" || variant === "success") && (
        <motion.span
          animate={{
            opacity: [0.25, 0.55, 0.25],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-2xl bg-white/10"
        />
      )}

      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && (
              <motion.span
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center"
              >
                {icon}
              </motion.span>
            )}
            {children}
          </>
        )}
      </span>
    </motion.button>
  );
};

export default Button;