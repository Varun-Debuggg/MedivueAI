import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "primary",
  delay = 0,
}) => {
  const colors = {
    primary: {
      gradient:
        "from-[#02aaa5] via-[#12cfc7] to-[#20d7cf]",
      glow: "bg-cyan-400/20",
      text: "text-[#039b97]",
    },

    teal: {
      gradient:
        "from-cyan-500 via-teal-500 to-emerald-500",
      glow: "bg-teal-400/20",
      text: "text-teal-600",
    },

    green: {
      gradient:
        "from-emerald-500 via-green-500 to-lime-500",
      glow: "bg-green-400/20",
      text: "text-green-600",
    },

    red: {
      gradient:
        "from-red-500 via-rose-500 to-red-600",
      glow: "bg-red-400/20",
      text: "text-red-600",
    },

    yellow: {
      gradient:
        "from-amber-500 via-yellow-500 to-orange-500",
      glow: "bg-yellow-400/20",
      text: "text-yellow-600",
    },

    purple: {
      gradient:
        "from-violet-500 via-purple-500 to-fuchsia-500",
      glow: "bg-purple-400/20",
      text: "text-purple-600",
    },
  };

  const theme = colors[color];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.5,
        delay,
      }}
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      className="
        relative
        overflow-hidden
        rounded-[28px]
        bg-white
        dark:bg-[#0b2423]
        border
        border-cyan-100
        dark:border-cyan-900
        shadow-xl
        hover:shadow-2xl
        transition-all
        duration-500
        group
      "
    >
      {/* Glow */}
      <div
        className={`
          absolute
          -top-16
          -right-16
          w-40
          h-40
          rounded-full
          blur-3xl
          opacity-30
          ${theme.glow}
        `}
      />

      {/* Hover Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          bg-gradient-to-br
          from-cyan-400/5
          via-transparent
          to-cyan-400/10
        "
      />

      {/* Top Accent */}
      <div
        className={`
          h-1.5
          bg-gradient-to-r
          ${theme.gradient}
        `}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between">
          {/* Left */}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              {title}
            </p>

            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="
                text-4xl
                font-black
                text-gray-900
                dark:text-white
                mb-3
              "
            >
              {value}
            </motion.h3>

            {trend && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-1.5
                  rounded-full
                  text-sm
                  font-bold
                  ${
                    trend === "up"
                      ? "bg-green-50 text-green-600 dark:bg-green-950/30"
                      : "bg-red-50 text-red-600 dark:bg-red-950/30"
                  }
                `}
              >
                {trend === "up" ? (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    <span>{trendValue}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4" />
                    <span>{trendValue}</span>
                    <ArrowDownRight className="w-4 h-4" />
                  </>
                )}
              </motion.div>
            )}
          </div>

          {/* Icon */}
          {Icon && (
            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.08,
              }}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
                className={`
                  absolute
                  inset-0
                  rounded-3xl
                  blur-xl
                  opacity-50
                  bg-gradient-to-br
                  ${theme.gradient}
                `}
              />

              <div
                className={`
                  relative
                  p-4
                  rounded-3xl
                  bg-gradient-to-br
                  ${theme.gradient}
                  shadow-xl
                `}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Bottom Progress Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          className={`
            mt-6
            h-1
            rounded-full
            origin-left
            bg-gradient-to-r
            ${theme.gradient}
          `}
        />
      </div>
    </motion.div>
  );
};

export default StatCard;