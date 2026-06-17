// Import lazy loading function and Suspense fallback wrapper component.
import { lazy, Suspense } from "react";
// Import Routes and Route components from react-router-dom to define application paths.
import { Routes, Route } from "react-router-dom";

// Use React.lazy to dynamic-import the Dashboard page component, splitting it into its own bundle.
const Dashboard = lazy(() => import("../pages/Dashboard"));
// Use React.lazy to dynamic-import the Leads page component, splitting it into its own bundle.
const Leads = lazy(() => import("../pages/Leads"));
// Use React.lazy to dynamic-import the Analytics page component, splitting it into its own bundle.
const Analytics = lazy(() => import("../pages/Analytics"));
// Use React.lazy to dynamic-import the Profile page component, splitting it into its own bundle.
const Profile = lazy(() => import("../pages/Profile"));
// Use React.lazy to dynamic-import the Reports page component, splitting it into its own bundle.
const Reports = lazy(() => import("../pages/Reports"));
// Use React.lazy to dynamic-import the Settings page component, splitting it into its own bundle.
const Settings = lazy(() => import("../pages/Settings"));
// Use React.lazy to dynamic-import the HelpSupport page component, splitting it into its own bundle.
const HelpSupport = lazy(() => import("../pages/HelpSupport"));
// Use React.lazy to dynamic-import the NotFound page component, splitting it into its own bundle.
const NotFound = lazy(() => import("../pages/NotFound"));

/**
 * PageLoader component
 * A visual loader element displayed during Suspense fallback while lazy pages are fetched.
 */
function PageLoader() {
  return (
    // A flexbox container that centers the loading spinner both vertically and horizontally.
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {/* A CSS-animated spinner circle with blue top border and transparent side borders */}
      <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin"></div>
      {/* Text with an opacity-pulsing animation to let users know the page is loading */}
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
        Loading page...
      </p>
    </div>
  );
}

/**
 * AppRoutes component
 * Configures the router paths and ties each route to its corresponding page component.
 */
export default function AppRoutes() {
  return (
    // Wrap the Routes list in Suspense, rendering PageLoader while components are resolving.
    <Suspense fallback={<PageLoader />}>
      {/* Container for grouping all the individual Route paths */}
      <Routes>
        {/* Defines the Dashboard page route mapped to the root "/" path */}
        <Route path="/" element={<Dashboard />} />
        {/* Defines the Leads page route mapped to the "/leads" path */}
        <Route path="/leads" element={<Leads />} />
        {/* Defines the Analytics page route mapped to the "/analytics" path */}
        <Route path="/analytics" element={<Analytics />} />
        {/* Defines the Profile page route mapped to the "/profile" path */}
        <Route path="/profile" element={<Profile />} />
        {/* Defines the Reports page route mapped to the "/reports" path */}
        <Route path="/reports" element={<Reports />} />
        {/* Defines the Settings page route mapped to the "/settings" path */}
        <Route path="/settings" element={<Settings />} />
        {/* Defines the Help & Support page route mapped to the "/help" path */}
        <Route path="/help" element={<HelpSupport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}