import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3 } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

export default function Sidebar() {
  const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/leads", label: "Leads", icon: Users },
    { to: "/analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <>
      <aside className="hidden md:flex md:w-64 md:min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex-col transition-colors duration-200">
        <h1 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          Startup CRM
        </h1>

        <nav className="flex flex-col gap-3 flex-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <DarkModeToggle />
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden justify-around bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className="flex flex-col items-center justify-center min-w-16 min-h-12 text-gray-700 dark:text-gray-300"
          >
            <Icon size={22} />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}