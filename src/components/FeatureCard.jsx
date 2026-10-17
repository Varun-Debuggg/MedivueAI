import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
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
      {/* Glow Effect */}
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

      {/* Animated Border */}
      <div
        className="
          absolute
          inset-0
          rounded-[28px]
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
          bg-gradient-to-r
          from-[#05bdb8]
          via-[#20d7cf]
          to-[#8ffff8]
          p-[1px]
        "
      >
        <div className="w-full h-full rounded-[27px] bg-white dark:bg-[#0b2423]" />
      </div>

      <div className="relative z-10 p-7">
        {/* Top */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            whileHover={{
              rotate: [0, -8, 8, -8, 0],
              scale: 1.08,
            }}
            transition={{ duration: 0.6 }}
            className="
              w-16
              h-16
              rounded-2xl
              bg-gradient-to-br
              from-[#04bdb7]
              via-[#18d6cf]
              to-[#91fff7]
              flex
              items-center
              justify-center
              shadow-lg
              shadow-cyan-500/20
            "
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ x: 3, y: -3 }}
            className="
              w-10
              h-10
              rounded-xl
              bg-cyan-50
              dark:bg-cyan-950/30
              flex
              items-center
              justify-center
              text-[#05bdb8]
              opacity-0
              group-hover:opacity-100
              transition-all
              duration-300
            "
          >
            <ArrowUpRight className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Title */}
        <h3
          className="
            text-2xl
            font-bold
            text-gray-900
            dark:text-white
            mb-3
            group-hover:text-[#039b97]
            dark:group-hover:text-[#5af7ee]
            transition-colors
          "
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="
            text-gray-600
            dark:text-gray-400
            leading-relaxed
            text-[15px]
          "
        >
          {description}
        </p>

        {/* Bottom Line */}
        <div
          className="
            mt-6
            h-1
            rounded-full
            bg-gradient-to-r
            from-[#05bdb8]
            via-[#20d7cf]
            to-transparent
            scale-x-0
            group-hover:scale-x-100
            transition-transform
            duration-500
            origin-left
          "
        />
      </div>
    </motion.div>
  );
};

export default FeatureCard;