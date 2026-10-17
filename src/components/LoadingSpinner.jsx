import { motion } from "framer-motion";
import {
  Brain,
  Microscope,
  ScanLine,
  Sparkles,
} from "lucide-react";

const LoadingSpinner = ({
  size = "md",
  text = "Analyzing Blood Smear...",
}) => {
  const dimensions = {
    sm: 80,
    md: 120,
    lg: 160,
    xl: 220,
  };

  const spinnerSize = dimensions[size] || 120;

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div
        className="relative flex items-center justify-center"
        style={{
          width: spinnerSize,
          height: spinnerSize,
        }}
      >
        {/* Outer Glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.6, 0.25],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="
            absolute
            inset-0
            rounded-full
            bg-cyan-400/20
            blur-3xl
          "
        />

        {/* Ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            inset-0
            rounded-full
            border-4
            border-cyan-300/30
            border-t-[#05bdb8]
          "
        />

        {/* Ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            inset-4
            rounded-full
            border-2
            border-cyan-200/20
            border-b-[#20d7cf]
          "
        />

        {/* Ring 3 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            inset-8
            rounded-full
            border
            border-dashed
            border-cyan-400/50
          "
        />

        {/* Scanner Line */}
        <motion.div
          animate={{
            y: [-35, 35, -35],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            w-16
            h-[3px]
            bg-gradient-to-r
            from-transparent
            via-[#05bdb8]
            to-transparent
            rounded-full
          "
        />

        {/* Center Core */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="
            relative
            w-20
            h-20
            rounded-full
            bg-gradient-to-br
            from-[#04bdb7]
            via-[#18d6cf]
            to-[#91fff7]
            flex
            items-center
            justify-center
            shadow-2xl
            shadow-cyan-500/30
          "
        >
          <Brain className="w-10 h-10 text-white" />
        </motion.div>

        {/* Floating Icons */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <Microscope className="w-5 h-5 text-[#05bdb8]" />
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <ScanLine className="w-5 h-5 text-[#05bdb8]" />
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <Sparkles className="w-5 h-5 text-[#05bdb8]" />
          </div>
        </motion.div>
      </div>

      {/* Text */}
      {text && (
        <div className="mt-8 text-center">
          <motion.h3
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              text-xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            {text}
          </motion.h3>

          <p className="mt-2 text-sm text-[#039b97] dark:text-[#5af7ee]">
            MediVue AI is processing the sample
          </p>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;