import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Info,
  X,
  XCircle,
} from "lucide-react";

const Alert = ({
  type = "info",
  title,
  message,
  onClose,
}) => {
  const config = {
    success: {
      icon: CheckCircle,
      gradient:
        "from-emerald-500 via-green-500 to-teal-500",
      bg: "bg-emerald-50 dark:bg-emerald-950/20",
      border: "border-emerald-300 dark:border-emerald-800",
      text: "text-emerald-700 dark:text-emerald-300",
      glow: "shadow-emerald-500/20",
    },

    error: {
      icon: XCircle,
      gradient:
        "from-red-500 via-rose-500 to-red-600",
      bg: "bg-red-50 dark:bg-red-950/20",
      border: "border-red-300 dark:border-red-800",
      text: "text-red-700 dark:text-red-300",
      glow: "shadow-red-500/20",
    },

    warning: {
      icon: AlertCircle,
      gradient:
        "from-amber-500 via-yellow-500 to-orange-500",
      bg: "bg-amber-50 dark:bg-amber-950/20",
      border: "border-amber-300 dark:border-amber-800",
      text: "text-amber-700 dark:text-amber-300",
      glow: "shadow-amber-500/20",
    },

    info: {
      icon: Info,
      gradient:
        "from-[#02aaa5] via-[#12cfc7] to-[#20d7cf]",
      bg: "bg-cyan-50 dark:bg-cyan-950/20",
      border: "border-cyan-300 dark:border-cyan-900",
      text: "text-cyan-700 dark:text-cyan-300",
      glow: "shadow-cyan-500/20",
    },
  };

  const current = config[type];
  const Icon = current.icon;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -25,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -25,
        scale: 0.96,
      }}
      transition={{
        duration: 0.35,
      }}
      className={`
        relative
        overflow-hidden
        rounded-[24px]
        border
        ${current.border}
        ${current.bg}
        backdrop-blur-lg
        shadow-xl
        ${current.glow}
      `}
    >
      {/* Top Gradient Line */}
      <div
        className={`
          h-1.5
          bg-gradient-to-r
          ${current.gradient}
        `}
      />

      {/* Background Glow */}
      <div
        className={`
          absolute
          right-0
          top-0
          w-32
          h-32
          rounded-full
          blur-3xl
          opacity-20
          bg-gradient-to-br
          ${current.gradient}
        `}
      />

      <div className="relative p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className={`
              flex-shrink-0
              w-12
              h-12
              rounded-2xl
              flex
              items-center
              justify-center
              bg-gradient-to-br
              ${current.gradient}
              shadow-lg
            `}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {title && (
              <h4
                className={`
                  font-bold
                  text-lg
                  ${current.text}
                  mb-1
                `}
              >
                {title}
              </h4>
            )}

            <p
              className={`
                text-sm
                leading-relaxed
                whitespace-pre-line
                ${current.text}
              `}
            >
              {message}
            </p>
          </div>

          {/* Close Button */}
          {onClose && (
            <motion.button
              whileHover={{
                scale: 1.1,
                rotate: 90,
              }}
              whileTap={{
                scale: 0.9,
              }}
              onClick={onClose}
              className="
                flex-shrink-0
                w-10
                h-10
                rounded-xl
                flex
                items-center
                justify-center
                bg-white/50
                dark:bg-black/20
                hover:bg-white
                dark:hover:bg-black/30
                transition-colors
              "
            >
              <X className="w-5 h-5 text-gray-500" />
            </motion.button>
          )}
        </div>

        {/* Progress Line */}
        <motion.div
          initial={{
            width: "100%",
          }}
          animate={{
            width: "0%",
          }}
          transition={{
            duration: 6,
            ease: "linear",
          }}
          className={`
            mt-4
            h-1
            rounded-full
            bg-gradient-to-r
            ${current.gradient}
          `}
        />
      </div>
    </motion.div>
  );
};

export default Alert;