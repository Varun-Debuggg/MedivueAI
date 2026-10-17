import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Search,
  CheckCircle2,
} from "lucide-react";
import React, {
  forwardRef,
  useState,
} from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      success,
      icon,
      className = "",
      containerClassName = "",
      type = "text",
      searchable = false,
      helperText,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
      type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    return (
      <div className={`w-full ${containerClassName}`}>
        {/* Label */}
        {label && (
          <motion.label
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              block
              mb-2
              text-sm
              font-bold
              text-gray-700
              dark:text-gray-300
            "
          >
            {label}
          </motion.label>
        )}

        {/* Input Wrapper */}
        <motion.div
          animate={{
            scale: focused ? 1.01 : 1,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            relative
            group
          "
        >
          {/* Glow */}
          <div
            className={`
              absolute
              inset-0
              rounded-2xl
              opacity-0
              transition-opacity
              duration-300
              blur-xl
              ${
                focused
                  ? "opacity-100 bg-cyan-400/20"
                  : ""
              }
            `}
          />

          {/* Main Input Container */}
          <div
            className={`
              relative
              flex
              items-center
              rounded-2xl
              border
              bg-white
              dark:bg-[#0b2423]
              transition-all
              duration-300
              
              ${
                error
                  ? `
                    border-red-400
                    dark:border-red-700
                  `
                  : focused
                  ? `
                    border-[#05bdb8]
                    shadow-lg
                    shadow-cyan-500/10
                  `
                  : `
                    border-cyan-100
                    dark:border-cyan-900
                  `
              }
            `}
          >
            {/* Left Icon */}
            {(icon || searchable) && (
              <div
                className="
                  absolute
                  left-4
                  flex
                  items-center
                  justify-center
                "
              >
                {searchable ? (
                  <Search className="w-5 h-5 text-[#05bdb8]" />
                ) : React.isValidElement(icon) ? (
                  icon
                ) : (
                  icon &&
                  React.createElement(icon, {
                    className:
                      "w-5 h-5 text-[#05bdb8]",
                  })
                )}
              </div>
            )}

            {/* Input */}
            <motion.input
              ref={ref}
              type={inputType}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className={`
                w-full
                bg-transparent
                px-5
                py-4
                text-gray-900
                dark:text-white
                placeholder:text-gray-400
                focus:outline-none
                rounded-2xl
                
                ${
                  icon || searchable
                    ? "pl-12"
                    : ""
                }

                ${
                  type === "password"
                    ? "pr-12"
                    : ""
                }

                ${
                  success
                    ? "pr-12"
                    : ""
                }

                ${className}
              `}
              {...props}
            />

            {/* Password Toggle */}
            {type === "password" && (
              <motion.button
                type="button"
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                  absolute
                  right-4
                  text-gray-500
                "
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </motion.button>
            )}

            {/* Success */}
            {success && type !== "password" && (
              <CheckCircle2
                className="
                  absolute
                  right-4
                  w-5
                  h-5
                  text-green-500
                "
              />
            )}
          </div>

          {/* Animated Border */}
          <motion.div
            animate={{
              opacity: focused ? 1 : 0,
            }}
            className="
              absolute
              inset-0
              rounded-2xl
              pointer-events-none
              border
              border-[#20d7cf]
            "
          />
        </motion.div>

        {/* Helper Text */}
        {helperText && !error && (
          <p
            className="
              mt-2
              text-xs
              text-gray-500
              dark:text-gray-400
            "
          >
            {helperText}
          </p>
        )}

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              className="
                mt-2
                flex
                items-center
                gap-2
                text-sm
                text-red-500
              "
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;