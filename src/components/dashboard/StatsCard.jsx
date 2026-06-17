import { ArrowUpRight, ArrowDownRight } from "lucide-react";

/**
 * Helper to map color strings to tailored light/dark Tailwind classes
 * for consistent, premium aesthetics.
 * 
 * @param {string} color - The input color identifier or Tailwind bg class
 * @returns {object} Tailwind color scheme configuration object
 */
const getColorScheme = (color = "") => {
  const normalized = color.toLowerCase();
  
  if (normalized.includes("blue") || normalized.includes("primary")) {
    return {
      bg: "bg-white dark:bg-gray-800 border-l-4 border-blue-500",
      iconContainer: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      badge: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400",
    };
  }
  if (normalized.includes("green") || normalized.includes("success")) {
    return {
      bg: "bg-white dark:bg-gray-800 border-l-4 border-green-500",
      iconContainer: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      badge: "bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-400",
    };
  }
  if (normalized.includes("red") || normalized.includes("danger")) {
    return {
      bg: "bg-white dark:bg-gray-800 border-l-4 border-red-500",
      iconContainer: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400",
      badge: "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400",
    };
  }
  if (normalized.includes("yellow") || normalized.includes("amber") || normalized.includes("warning")) {
    return {
      bg: "bg-white dark:bg-gray-800 border-l-4 border-amber-500",
      iconContainer: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
      badge: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400",
    };
  }
  
  return {
    bg: "bg-white dark:bg-gray-800 border-l-4 border-gray-400",
    iconContainer: "bg-gray-50 dark:bg-gray-700/20 text-gray-600 dark:text-gray-400",
    badge: "bg-gray-50 dark:bg-gray-700/20 text-gray-700 dark:text-gray-400",
  };
};

/**
 * StatsCard component
 * Displays a single key metric with a responsive design, hover micro-animations,
 * status icon, large value indicator, and positive/negative trend display.
 * 
 * @component
 * @param {object} props - Component props
 * @param {string} props.title - The descriptive metric title (e.g. "Total Leads")
 * @param {string|number} props.value - The current value of the metric (e.g. 42 or "$124,500")
 * @param {React.ComponentType} [props.icon] - The Lucide React icon component to render
 * @param {number|string} [props.change] - The percentage change vs last month (positive or negative)
 * @param {string} [props.color] - Color theme identifier: 'blue', 'green', 'red', 'yellow' or standard Tailwind classes
 */
export default function StatsCard({ title, value, icon: Icon = null, change = 0, color = "blue" }) {
  const scheme = getColorScheme(color);
  
  // Format numeric change and determine sign
  const numericChange = Number(change);
  const isPositive = numericChange >= 0;
  const isZero = isNaN(numericChange) || numericChange === 0;
  
  return (
    <div className={`relative overflow-hidden rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ease-in-out group ${scheme.bg}`}>
      {/* Background soft glow animation on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-gray-50/30 dark:to-gray-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <span className="text-sm font-semibold tracking-wider uppercase text-gray-400 dark:text-gray-500">
            {title}
          </span>
          <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {value}
          </h3>
        </div>

        {Icon && (
          <div className={`p-3 rounded-lg transition-transform duration-300 group-hover:scale-110 ${scheme.iconContainer}`}>
            <Icon className="w-6 h-6 stroke-[2]" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-4 text-xs font-semibold">
        {!isZero && (
          <span className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full ${
            isPositive 
              ? "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400"
              : "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400"
          }`}>
            {isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
            {Math.abs(numericChange).toFixed(1)}%
          </span>
        )}
        <span className="text-gray-400 dark:text-gray-500 font-medium">
          vs last month
        </span>
      </div>
    </div>
  );
}