import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Rocket,
  User,
  FileText,
  Settings,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

/**
 * Sidebar component
 * Renders a fully responsive sidebar navigation panel.
 * - Desktop: Fixed full-height side navigation panel (responsive width: `md:w-56 lg:w-64`).
 * - Tablet: Compact typography and margins to prevent overflows.
 * - Mobile: Sticky header bar with a hamburger toggle that slides open a drawer overlay with backdrop mask.
 * 
 * @component
 */
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Main navigation items
  const mainLinks = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/leads", label: "Leads", icon: Users },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
  ];

  // Bottom navigation items (separated by a divider)
  const bottomLinks = [
    { to: "/profile", label: "Profile", icon: User },
    { to: "/reports", label: "Reports", icon: FileText },
    { to: "/settings", label: "Settings", icon: Settings },
    { to: "/help", label: "Help & Support", icon: HelpCircle },
  ];

  /**
   * Calculates Tailwind class names dynamically based on Link active status.
   * Includes hover transitions and dark/light color variations.
   */
  const getLinkClass = ({ isActive }) => {
    const baseClass =
      "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer focus:outline-none ";
    return isActive
      ? `${baseClass} bg-blue-50 text-blue-600 font-bold dark:bg-gray-700/80 dark:text-blue-400`
      : `${baseClass} text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700/40 hover:text-gray-900 dark:hover:text-white`;
  };

  return (
    <>
      {/* MOBILE STICKY HEADER - Visible only on mobile view (<768px) */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-250/30 dark:border-gray-700 flex items-center justify-between px-4 md:hidden z-30 shadow-xs transition-colors duration-200 no-print">
        <div className="flex items-center gap-2">
          <Rocket className="text-blue-600 dark:text-blue-400" size={22} />
          <span className="font-extrabold text-lg text-gray-905 dark:text-white tracking-wide">
            Startup CRM Lite
          </span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Navigation Menu"
          className="p-2 rounded-lg text-gray-650 dark:text-gray-355 hover:bg-slate-100 dark:hover:bg-gray-700/50 cursor-pointer focus:outline-none"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* BACKDROP OVERLAY - Visible on mobile when drawer is active */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300 animate-fade-in"
        />
      )}

      {/* SIDEBAR CONTAINER - Slides on mobile, stationary sidebar on desktop */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-250/30 dark:border-gray-700 p-4 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:h-screen md:w-56 lg:w-64 transition-colors duration-200 no-print ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header section (Rocket Logo + App Name + Mobile Close button) */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Rocket className="text-blue-600 dark:text-blue-400" size={24} />
            <h1 className="text-lg lg:text-xl font-black text-gray-900 dark:text-white tracking-wide">
              Startup CRM Lite
            </h1>
          </div>
          {/* Close button visible only inside mobile drawer */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Navigation Menu"
            className="p-1 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-700/50 md:hidden cursor-pointer focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Nav list content */}
        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-1">
          {/* Main items */}
          {mainLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={getLinkClass}
            >
              <Icon size={20} className="stroke-[2.2]" />
              <span className="text-sm font-semibold tracking-wide">{label}</span>
            </NavLink>
          ))}

          {/* Section Divider */}
          <hr className="my-4 border-gray-200/80 dark:border-gray-700/60" />

          {/* Bottom items */}
          {bottomLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsOpen(false)}
              className={getLinkClass}
            >
              <Icon size={20} className="stroke-[2.2]" />
              <span className="text-sm font-semibold tracking-wide">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer section (Theme toggle switch) */}
        <div className="pt-4 mt-auto border-t border-gray-200/80 dark:border-gray-700/60">
          <DarkModeToggle />
        </div>
      </aside>
    </>
  );
}
