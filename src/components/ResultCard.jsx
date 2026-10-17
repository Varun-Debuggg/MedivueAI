import { motion } from "framer-motion";
import {
  AlertTriangle,
  Brain,
  CheckCircle,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const ResultCard = ({
  status,
  confidence = 0,
  details,
  timestamp,
  imageUrl,
}) => {
  const statusConfig = {
    healthy: {
      icon: ShieldCheck,
      title: "No Malaria Detected",
      subtitle: "AI screening indicates a healthy sample",
      color: "#10b981",
      bg: "from-emerald-500 to-green-500",
      badge: "Healthy",
    },

    infected: {
      icon: XCircle,
      title: "Malaria Detected",
      subtitle: "Parasite patterns identified in sample",
      color: "#ef4444",
      bg: "from-red-500 to-rose-500",
      badge: "Positive",
    },

    uncertain: {
      icon: AlertTriangle,
      title: "Further Review Needed",
      subtitle: "Confidence below recommended threshold",
      color: "#f59e0b",
      bg: "from-amber-500 to-orange-500",
      badge: "Review",
    },
  };

  const config = statusConfig[status] || statusConfig.uncertain;
  const Icon = config.icon;

  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (confidence / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        overflow-hidden
        rounded-[32px]
        bg-white
        dark:bg-[#0b2423]
        border
        border-cyan-100
        dark:border-cyan-900
        shadow-2xl
      "
    >
      {/* Header */}
      <div
        className={`
          bg-gradient-to-r
          ${config.bg}
          p-8
          text-white
          relative
          overflow-hidden
        `}
      >
        <div className="absolute right-0 top-0 w-56 h-56 bg-white/10 rounded-full blur-3xl" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur mb-4"
            >
              <Icon className="w-5 h-5" />
              {config.badge}
            </motion.div>

            <h2 className="text-4xl font-black mb-2">
              {config.title}
            </h2>

            <p className="text-white/90 text-lg">
              {config.subtitle}
            </p>
          </div>

          {/* Circular Confidence */}
          <div className="relative">
            <svg width="150" height="150">
              <circle
                stroke="rgba(255,255,255,0.25)"
                fill="transparent"
                strokeWidth="10"
                r={radius}
                cx="75"
                cy="75"
              />

              <motion.circle
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5 }}
                stroke="#ffffff"
                fill="transparent"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                r={radius}
                cx="75"
                cy="75"
                transform="rotate(-90 75 75)"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black">
                {confidence}
              </span>
              <span className="text-sm">
                Confidence
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* Image */}
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">
              Uploaded Sample
            </h3>

            <div className="overflow-hidden rounded-3xl border border-cyan-100 dark:border-cyan-900">
              <img
                src={imageUrl}
                alt="Sample"
                className="w-full max-h-[380px] object-contain bg-gray-50 dark:bg-[#061616]"
              />
            </div>
          </motion.div>
        )}

        {/* Probabilities */}
        {details && (
          <div className="grid md:grid-cols-2 gap-5">
            <motion.div
              whileHover={{ y: -4 }}
              className="
                rounded-3xl
                bg-[#effefd]
                dark:bg-[#082f2d]
                p-6
                border
                border-cyan-100
                dark:border-cyan-900
              "
            >
              <p className="text-sm text-gray-500">
                Parasitized Probability
              </p>

              <h3 className="text-3xl font-black text-[#039b97] mt-2">
                {details.parasitized_probability || "N/A"}
              </h3>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="
                rounded-3xl
                bg-[#effefd]
                dark:bg-[#082f2d]
                p-6
                border
                border-cyan-100
                dark:border-cyan-900
              "
            >
              <p className="text-sm text-gray-500">
                Uninfected Probability
              </p>

              <h3 className="text-3xl font-black text-[#039b97] mt-2">
                {details.uninfected_probability || "N/A"}
              </h3>
            </motion.div>
          </div>
        )}

        {/* Details */}
        {details && (
          <div className="rounded-3xl bg-gray-50 dark:bg-[#081b1a] p-6 border border-gray-100 dark:border-cyan-950">
            <div className="flex items-center gap-3 mb-5">
              <Brain className="w-6 h-6 text-[#05bdb8]" />
              <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                AI Analysis Details
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(details).map(([key, value]) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  key={key}
                  className="
                    flex
                    justify-between
                    items-center
                    p-4
                    rounded-2xl
                    bg-white
                    dark:bg-[#0b2423]
                    border
                    border-cyan-50
                    dark:border-cyan-900
                  "
                >
                  <span className="capitalize text-gray-600 dark:text-gray-400">
                    {key.replace(/_/g, " ")}
                  </span>

                  <span className="font-bold text-gray-900 dark:text-white">
                    {String(value)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="
            rounded-3xl
            bg-gradient-to-r
            from-[#05bdb8]
            to-[#20d7cf]
            p-6
            text-white
          "
        >
          <h3 className="font-black text-xl mb-2">
            Clinical Recommendation
          </h3>

          <p className="text-white/95">
            This AI result should be reviewed and confirmed
            by a qualified healthcare professional before
            final diagnosis or treatment decisions.
          </p>
        </motion.div>

        {timestamp && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Analysis completed on{" "}
            {new Date(timestamp).toLocaleString()}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultCard;