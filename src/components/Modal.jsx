import { AnimatePresence, motion } from "framer-motion";
import {
  GripHorizontal,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showControls = true,
}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  const modalSize = expanded
    ? "max-w-[95vw]"
    : sizes[size];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-50
              bg-black/60
              backdrop-blur-xl
            "
          />

          {/* Modal Wrapper */}
          <div
            className="
              fixed
              inset-0
              z-50
              flex
              items-center
              justify-center
              p-4
            "
          >
            <motion.div
              drag
              dragMomentum={false}
              dragElastic={0.08}
              onDragEnd={(e, info) => {
                if (info.offset.y > 180) {
                  onClose();
                }
              }}
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              className={`
                relative
                w-full
                ${modalSize}
                rounded-[32px]
                overflow-hidden
                border
                border-cyan-100
                dark:border-cyan-900
                bg-white/85
                dark:bg-[#0b2423]/90
                backdrop-blur-2xl
                shadow-[0_25px_80px_rgba(0,0,0,0.25)]
              `}
            >
              {/* Glow Effects */}
              <div
                className="
                  absolute
                  -top-20
                  -right-20
                  w-48
                  h-48
                  rounded-full
                  bg-cyan-400/10
                  blur-3xl
                "
              />

              <div
                className="
                  absolute
                  -bottom-20
                  -left-20
                  w-48
                  h-48
                  rounded-full
                  bg-teal-400/10
                  blur-3xl
                "
              />

              {/* Top Gradient */}
              <div
                className="
                  h-1.5
                  bg-gradient-to-r
                  from-[#02aaa5]
                  via-[#12cfc7]
                  to-[#20d7cf]
                "
              />

              {/* Header */}
              <div
                className="
                  relative
                  flex
                  items-center
                  justify-between
                  px-7
                  py-5
                  border-b
                  border-cyan-100
                  dark:border-cyan-900
                "
              >
                <div className="flex items-center gap-4">
                  <GripHorizontal className="w-5 h-5 text-[#05bdb8]" />

                  <div>
                    <h2
                      className="
                        text-2xl
                        font-black
                        text-gray-900
                        dark:text-white
                      "
                    >
                      {title}
                    </h2>

                    <p
                      className="
                        text-sm
                        text-[#039b97]
                        dark:text-[#5af7ee]
                      "
                    >
                      MediVue Clinical Workspace
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  {showControls && (
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                      onClick={() =>
                        setExpanded(!expanded)
                      }
                      className="
                        p-3
                        rounded-xl
                        bg-cyan-50
                        dark:bg-[#082f2d]
                      "
                    >
                      {expanded ? (
                        <Minimize2 className="w-5 h-5 text-[#05bdb8]" />
                      ) : (
                        <Maximize2 className="w-5 h-5 text-[#05bdb8]" />
                      )}
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{
                      rotate: 90,
                      scale: 1.1,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                    onClick={onClose}
                    className="
                      p-3
                      rounded-xl
                      bg-red-50
                      dark:bg-red-950/20
                    "
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div
                className="
                  relative
                  p-7
                  overflow-y-auto
                  max-h-[80vh]
                "
              >
                {children}
              </div>

              {/* Bottom Glow Line */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "linear",
                }}
                className="
                  absolute
                  bottom-0
                  h-[2px]
                  w-40
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-400
                  to-transparent
                "
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;