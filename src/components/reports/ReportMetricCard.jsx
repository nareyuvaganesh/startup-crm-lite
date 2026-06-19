import { memo } from "react";

function ReportMetricCard({ icon: Icon, label, value, description, iconClassName }) {
  return (
    <article className="min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg dark:border-gray-700/50 dark:bg-gray-800 sm:p-5">
      <div className="mb-2 flex items-start justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {label}
        </span>
        <Icon className={`size-5 ${iconClassName}`} aria-hidden="true" />
      </div>
      <p className="truncate text-2xl font-extrabold text-gray-900 dark:text-white">
        {value}
      </p>
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
        {description}
      </span>
    </article>
  );
}

export default memo(ReportMetricCard);
