import { NavLink } from "react-router-dom";
import {
  BarChart3,
  ChevronRight,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Rocket,
  Settings,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { useProfile } from "../../context/ProfileContext";
import DarkModeToggle from "./DarkModeToggle";

const primaryLinks = [
  {
    to: "/",
    label: "Dashboard",
    subLabel: "Pipeline overview",
    icon: LayoutDashboard,
  },
  {
    to: "/leads",
    label: "Leads",
    subLabel: "Manage prospects",
    icon: Users,
  },
  {
    to: "/analytics",
    label: "Analytics",
    subLabel: "Performance insights",
    icon: BarChart3,
  },
];

const mobileLinks = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/leads",
    label: "Leads",
    icon: Users,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: UserRound,
  },
  {
    to: "/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

const secondaryLinks = [
  {
    to: "/reports",
    label: "Reports",
    subLabel: "Business summaries",
    icon: FileText,
  },
  {
    to: "/settings",
    label: "Settings",
    subLabel: "Workspace preferences",
    icon: Settings,
  },
  {
    to: "/help",
    label: "Help & Support",
    subLabel: "Guides and assistance",
    icon: HelpCircle,
  },
];

/**
 * Responsive application navigation.
 * Mobile uses an icon-only bottom bar and More drawer; tablet and desktop use
 * a fixed-width left sidebar, with sub-labels revealed on large screens.
 */
export default function Sidebar({
  isMobileMenuOpen,
  onMobileMenuClose,
}) {
  const { profile } = useProfile();
  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ");
  const initials = [profile.firstName, profile.lastName]
    .filter(Boolean)
    .map((name) => name.trim().charAt(0))
    .join("")
    .toUpperCase() || "?";

  const desktopLinkClass = ({ isActive }) =>
    `flex min-h-12 items-center gap-3 rounded-xl px-3 py-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
      isActive
        ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex min-h-14 min-w-14 flex-1 flex-col items-center justify-center rounded-xl transition-colors duration-200 ${
      isActive
        ? "text-blue-600 dark:text-blue-400"
        : "text-gray-500 dark:text-gray-400"
    }`;

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-gray-200 bg-white p-4 transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800 md:flex lg:w-72 lg:p-5">
        <div className="mb-7 flex items-center gap-3 px-2">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
            <Rocket className="size-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-black text-gray-900 dark:text-white lg:text-lg">
              Startup CRM
            </h1>
            <p className="hidden text-[11px] font-medium text-gray-400 lg:block">
              Lightweight sales workspace
            </p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto">
          {primaryLinks.map(({ to, label, subLabel, icon: Icon }) => (
            <NavLink key={to} to={to} className={desktopLinkClass}>
              <Icon className="size-5 shrink-0" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{label}</span>
                <span className="hidden truncate text-[11px] font-medium opacity-60 lg:block">
                  {subLabel}
                </span>
              </span>
            </NavLink>
          ))}

          <div className="my-3 border-t border-gray-200 dark:border-gray-700" />

          {secondaryLinks.map(({ to, label, subLabel, icon: Icon }) => (
            <NavLink key={to} to={to} className={desktopLinkClass}>
              <Icon className="size-5 shrink-0" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{label}</span>
                <span className="hidden truncate text-[11px] font-medium opacity-60 lg:block">
                  {subLabel}
                </span>
              </span>
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `group mt-4 flex min-h-16 items-center gap-3 rounded-2xl border p-3 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              isActive
                ? "border-blue-200 bg-blue-50 dark:border-blue-500/30 dark:bg-blue-500/10"
                : "border-gray-200 bg-gray-50 hover:bg-white hover:shadow-sm dark:border-gray-700 dark:bg-gray-900/40 dark:hover:bg-gray-700/50"
            }`
          }
        >
          <div className="relative shrink-0">
            <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-bold text-white">
              {initials}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-emerald-500 dark:border-gray-800" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
              {fullName}
            </p>
            <p className="hidden truncate text-[11px] text-gray-500 dark:text-gray-400 lg:block">
              {profile.role || "View profile"}
            </p>
          </div>
          <ChevronRight className="hidden size-4 text-gray-400 lg:block" />
        </NavLink>
      </aside>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onMobileMenuClose}
            className="absolute inset-0 bg-black/50"
          />
          <section className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-gray-200 bg-white p-4 pb-24 shadow-2xl dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white">More</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Workspace navigation
                </p>
              </div>
              <button
                type="button"
                onClick={onMobileMenuClose}
                aria-label="Close navigation"
                className="grid size-11 place-items-center rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="grid grid-cols-2 gap-2">
              {secondaryLinks.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={onMobileMenuClose}
                  className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 px-3 text-sm font-semibold text-gray-700 dark:border-gray-700 dark:text-gray-200"
                >
                  <Icon className="size-5 text-blue-500" />
                  {label}
                </NavLink>
              ))}
              <NavLink
                to="/profile"
                onClick={onMobileMenuClose}
                className="flex min-h-14 items-center gap-3 rounded-xl border border-gray-200 px-3 text-sm font-semibold text-gray-700 dark:border-gray-700 dark:text-gray-200"
              >
                <UserRound className="size-5 text-blue-500" />
                Profile
              </NavLink>
            </nav>

            <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900/40">
              <DarkModeToggle />
            </div>
          </section>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 flex min-h-16 items-center border-t border-gray-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/95 md:hidden">
        {mobileLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            aria-label={label}
            title={label}
            className={mobileLinkClass}
          >
            <Icon className="size-5" />
            <span className="sr-only">{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
