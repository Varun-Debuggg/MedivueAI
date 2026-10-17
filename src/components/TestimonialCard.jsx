import { motion } from "framer-motion";
import { Quote, Star, Stethoscope } from "lucide-react";

const TestimonialCard = ({
  name,
  role,
  hospital,
  content,
  image,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay,
        ease: "easeOut",
      }}
      whileHover={{
        y: -10,
        scale: 1.025,
      }}
      className="relative group overflow-hidden rounded-[28px] bg-white dark:bg-[#0b2423] border border-cyan-100 dark:border-cyan-900 shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#20d7cf]/12 via-transparent to-[#05bdb8]/12" />

      {/* Top Accent */}
      <div className="h-1.5 bg-gradient-to-r from-[#05bdb8] via-[#20d7cf] to-[#8ffff8]" />

      <div className="relative z-10 p-7">
        {/* Quote + Rating */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            whileHover={{ rotate: -8, scale: 1.08 }}
            className="w-14 h-14 rounded-2xl bg-[#e7fffd] dark:bg-cyan-950/30 flex items-center justify-center"
          >
            <Quote className="w-8 h-8 text-[#05bdb8]" />
          </motion.div>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + item * 0.06 }}
              >
                <Star className="w-4 h-4 fill-[#05bdb8] text-[#05bdb8]" />
              </motion.span>
            ))}
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-700 dark:text-gray-300 mb-7 leading-relaxed italic text-[15px]">
          “{content}”
        </p>

        {/* Profile */}
        <div className="flex items-center gap-4">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-100 dark:border-cyan-900"
            />
          ) : (
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.65 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#04bdb7] via-[#18d6cf] to-[#91fff7] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-500/20"
            >
              {name?.charAt(0) || "M"}
            </motion.div>
          )}

          <div className="min-w-0">
            <p className="font-bold text-gray-900 dark:text-white truncate">
              {name}
            </p>

            <p className="text-sm text-[#039b97] dark:text-[#5af7ee] font-semibold">
              {role}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1 mt-1">
              <Stethoscope className="w-3.5 h-3.5" />
              {hospital}
            </p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-7 h-1 rounded-full bg-gradient-to-r from-[#05bdb8] via-[#20d7cf] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.div>
  );
};

export default TestimonialCard;