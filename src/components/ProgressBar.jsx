import { motion } from "framer-motion";
import { Brain, CheckCircle, ScanLine } from "lucide-react";

const ProgressBar = ({
  progress = 0,
  label,
  color = "primary",
  showLabel = true,
}) => {
  const gradients = {
    primary: "from-[#02aaa5] via-[#12cfc7] to-[#20d7cf]",
    teal: "from-cyan-500 via-teal-500 to-emerald-500",
    green: "from-emerald-500 via-green-500 to-lime-500",
    red: "from-red-500 via-rose-500 to-red-600",
    yellow: "from-amber-500 via-yellow-500 to-orange-500",
  };

  const getStatus = () => {
    if (progress < 25) return "Initializing AI Engine";
    if (progress < 50) return "Processing Blood Smear";
    if (progress < 75) return "Detecting Parasite Patterns";
    if (progress < 100) return "Generating Clinical Report";
    return "Analysis Completed";
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: progress < 100 ? 360 : 0,
              }}
              transition={{
                duration: 3,
                repeat: progress < 100 ? Infinity : 0,
                ease: "linear",
              }}
              className="
                w-10
                h-10
                rounded-2xl
                bg-gradient-to-br
                from-[#05bdb8]
                to-[#20d7cf]
                flex
                items-center
                justify-center
                shadow-lg
                shadow-cyan-500/20
              "
            >
              {progress === 100 ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <Brain className="w-5 h-5 text-white" />
              )}
            </motion.div>

            <div>
              <p className="font-bold text-gray-900 dark:text-white">
                {label || "AI Analysis"}
              </p>

              <p className="text-sm text-[#039b97] dark:text-[#5af7ee]">
                {getStatus()}
              </p>
            </div>
          </div>

          {/* Percentage */}
          <motion.div
            key={progress}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="
              px-4
              py-2
              rounded-full
              bg-[#effefd]
              dark:bg-[#082f2d]
              border
              border-cyan-100
              dark:border-cyan-900
            "
          >
            <span className="font-black text-[#039b97] text-lg">
              {progress}%
            </span>
          </motion.div>
        </div>
      )}

      {/* Main Bar Container */}
      <div
        className="
          relative
          h-6
          rounded-full
          overflow-hidden
          bg-gray-200
          dark:bg-[#082120]
          border
          border-cyan-100
          dark:border-cyan-950
        "
      >
        {/* Background Pulse */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="
            absolute
            inset-0
            bg-cyan-400/10
          "
        />

        {/* Progress Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${progress}%`,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className={`
            relative
            h-full
            bg-gradient-to-r
            ${gradients[color]}
            shadow-lg
          `}
        >
          {/* Moving Shine */}
          <motion.div
            animate={{
              x: [-100, 600],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-y-0
              w-24
              bg-gradient-to-r
              from-transparent
              via-white/40
              to-transparent
              skew-x-[-20deg]
            "
          />

          {/* Scanner */}
          {progress < 100 && (
            <motion.div
              animate={{
                x: [0, 20, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="
                absolute
                right-2
                top-1/2
                -translate-y-1/2
              "
            >
              <ScanLine className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Stage Indicators */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {[
          "Upload",
          "Processing",
          "Detection",
          "Report",
        ].map((step, index) => {
          const stepValue = (index + 1) * 25;

          const active = progress >= stepValue;

          return (
            <motion.div
              key={step}
              whileHover={{ scale: 1.03 }}
              className={`
                text-center
                py-2
                rounded-xl
                text-xs
                font-bold
                transition-all
                ${
                  active
                    ? "bg-[#05bdb8] text-white"
                    : "bg-gray-100 dark:bg-[#082120] text-gray-500"
                }
              `}
            >
              {step}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;