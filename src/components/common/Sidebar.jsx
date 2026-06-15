// Import NavLink from react-router-dom to automatically add active styling to current page links.
import { NavLink } from "react-router-dom";
// Import Lucide icons to represent the Dashboard, Leads, and Analytics pages, along with a branding rocket icon.
import { LayoutDashboard, Users, BarChart3, Rocket } from "lucide-react";
// Import the DarkModeToggle component to switch between light and dark theme modes.
import DarkModeToggle from "./DarkModeToggle";

/**
 * Sidebar component
 * Renders a vertical sidebar on desktop screens and a convenient bottom navigation bar on mobile devices.
 */
export default function Sidebar() {
  // Define route link configurations with path targets, text labels, and icon reference objects.
  const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/leads", label: "Leads", icon: Users },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
  ];

  /**
   * getLinkClass
   * Helper function to dynamically calculate Tailwind classes for desktop sidebar links based on the active state.
   */
  const getLinkClass = ({ isActive }) => {
    // Base layout class strings containing flex align-items, margins, padding, and corner rounding.
    const baseClass = "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ";
    // Return specific styling based on active state: blue background/text if active, grey hover states if inactive.
    return isActive
      ? `${baseClass} bg-blue-50 text-blue-600 font-semibold dark:bg-gray-700 dark:text-blue-400`
      : `${baseClass} text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white`;
  };

  /**
   * getMobileLinkClass
   * Helper function to dynamically calculate Tailwind classes for mobile bottom navigation links.
   */
  const getMobileLinkClass = ({ isActive }) => {
    // Base layout classes centering items in column flow with size constraints.
    const baseClass = "flex flex-col items-center justify-center min-w-16 min-h-12 transition-all duration-200 ";
    // Return accent style when active; return muted gray colors with light hover states when inactive.
    return isActive
      ? `${baseClass} text-blue-600 dark:text-blue-400 font-semibold scale-105`
      : `${baseClass} text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white`;
  };

  return (
    // Fragment container containing layout structures for desktop and mobile views.
    <>
      {/* DESKTOP VIEW: Aside element visible only on screens larger than 'md' break points */}
      <aside className="hidden md:flex md:w-64 md:min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex-col transition-colors duration-200">
        {/* Title container showing the Application Name logo and brand rocket icon in bold font */}
        <div className="flex items-center gap-2 mb-6">
          <Rocket className="text-blue-600 dark:text-blue-400" size={24} />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-wide">
            Startup CRM Lite
          </h1>
        </div>

        {/* Desktop Navigation list menu layout container */}
        <nav className="flex flex-col gap-3 flex-1">
          {/* Map through links array and generate NavLink wrappers for every route link configuration */}
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to} // Unique key identifier needed for React loop rendering efficiency.
              to={to} // Destination route path link targeting page location.
              className={getLinkClass} // Applies active styles dynamically using getLinkClass.
            >
              {/* Renders the Lucide icon inside NavLink container */}
              <Icon size={20} />
              {/* Renders the text label associated with current page location */}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar footer component displaying the theme toggle switch button */}
        <DarkModeToggle />
      </aside>

      {/* MOBILE VIEW: Sticky navbar pinned to screen bottom, visible only on small screens */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden justify-around bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 shadow-lg backdrop-blur-md bg-white/95 dark:bg-gray-800/95">
        {/* Map through links array and render simple grid buttons for small viewport navigation bar */}
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to} // Unique React key identifier.
            to={to} // Target navigation path.
            className={getMobileLinkClass} // Applies active styles dynamically using getMobileLinkClass.
          >
            {/* Renders standard sizing Lucide icon for finger-tap clarity */}
            <Icon size={22} />
            {/* Small description text directly beneath the icon */}
            <span className="text-xs mt-1">{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
