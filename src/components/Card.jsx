import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  hover = true,
  glassmorphism = false,
  glow = true,
  delay = 0,
  ...props
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.45,
        delay,
      }}
      whileHover={
        hover
          ? {
              y: -10,
              scale: 1.015,
            }
          : {}
      }
      className={`
        relative
        overflow-hidden
        rounded-[28px]
        ${
          glassmorphism
            ? `
              backdrop-blur-xl
              bg-white/70
              dark:bg-[#0b2423]/70
            `
            : `
              bg-white
              dark:bg-[#0b2423]
            `
        }
        border
        border-cyan-100
        dark:border-cyan-900
        shadow-xl
        transition-all
        duration-500
        group
        ${className}
      `}
      {...props}
    >
      {/* Glow Background */}
      {glow && (
        <>
          <div
            className="
              absolute
              inset-0
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-500
              bg-gradient-to-br
              from-[#20d7cf]/10
              via-transparent
              to-[#05bdb8]/10
            "
          />

          <div
            className="
              absolute
              -top-20
              -right-20
              w-40
              h-40
              rounded-full
              bg-cyan-400/10
              blur-3xl
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-700
            "
          />

          <div
            className="
              absolute
              -bottom-20
              -left-20
              w-40
              h-40
              rounded-full
              bg-teal-400/10
              blur-3xl
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-700
            "
          />
        </>
      )}

      {/* Animated Top Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
        className="
          absolute
          top-0
          left-0
          h-1
          w-full
          origin-left
          bg-gradient-to-r
          from-[#05bdb8]
          via-[#20d7cf]
          to-[#8ffff8]
        "
      />

      {/* Shine Effect */}
      <motion.div
        className="
          absolute
          inset-y-0
          -left-32
          w-24
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          skew-x-[-20deg]
          opacity-0
          group-hover:opacity-100
        "
        animate={{
          x: [-150, 700],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;