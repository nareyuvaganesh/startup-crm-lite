import { memo } from "react";

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-36 rounded-2xl bg-slate-200 dark:bg-gray-800" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-80 rounded-2xl bg-slate-200 dark:bg-gray-800" />
        ))}
      </div>
    </div>
  );
}
export default memo(LoadingSkeleton);
