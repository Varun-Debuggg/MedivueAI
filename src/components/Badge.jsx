import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Clock3,
  Brain,
} from "lucide-react";

const Badge = ({
  children,
  variant = "default",
  size = "md",
  pulse = false,
  icon = true,
}) => {
  const variants = {
    default: {
      classes:
        "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
      Icon: Activity,
    },

    primary: {
      classes:
        "bg-cyan-50 dark:bg-cyan-950/20 text-[#039b97] dark:text-[#5af7ee] border-cyan-200 dark:border-cyan-900",
      Icon: Brain,
    },

    success: {
      classes:
        "bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900",
      Icon: CheckCircle2,
    },

    warning: {
      classes:
        "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900",
      Icon: AlertTriangle,
    },

    danger: {
      classes:
        "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900",
      Icon: AlertTriangle,
    },

    info: {
      classes:
        "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900",
      Icon: ShieldCheck,
    },

    pending: {
      classes:
        "bg-orange-50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900",
      Icon: Clock3,
    },
  };

  const sizes = {
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-3.5 py-1.5",
    lg: "text-base px-4 py-2",
  };

  const current =
    variants[variant] || variants.default;

  const Icon = current.Icon;

  return (
    <motion.div
      whileHover={{
        scale: 1.06,
        y: -2,
      }}
      animate={
        pulse
          ? {
              scale: [1, 1.05, 1],
            }
          : {}
      }
      transition={{
        duration: 2,
        repeat: pulse ? Infinity : 0,
      }}
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        font-bold
        backdrop-blur-md
        shadow-sm
        ${sizes[size]}
        ${current.classes}
      `}
    >
      {icon && (
        <Icon className="w-4 h-4" />
      )}

      <span>{children}</span>

      {pulse && (
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="
            w-2
            h-2
            rounded-full
            bg-current
          "
        />
      )}
    </motion.div>
  );
};

export default Badge;