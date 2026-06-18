import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, CalendarClock, CheckCircle2, Search, UserPlus, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLeads } from "../../context/LeadContext";
import DarkModeToggle from "./DarkModeToggle";

const PAGE_TITLES = {
  "/": "Dashboard",
  "/leads": "Lead Management",
  "/analytics": "Analytics",
  "/reports": "Reports",
  "/settings": "Settings",
  "/help": "Help & Support",
  "/profile": "Profile",
};

/**
 * Compact desktop workspace navbar with functional search, notifications,
 * and theme controls.
 *
 * @returns {React.JSX.Element} Sticky application navbar.
 */
export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { leads } = useLeads();
  const navbarRef = useRef(null);
  const searchInputRef = useRef(null);
  const [activePanel, setActivePanel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsRead, setNotificationsRead] = useState(false);

  const title = PAGE_TITLES[pathname] || "Startup CRM";
  const searchResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return leads
      .filter((lead) =>
        [lead.name, lead.company, lead.email].some((value) =>
          String(value || "").toLowerCase().includes(normalizedQuery),
        ),
      )
      .slice(0, 5);
  }, [leads, searchQuery]);

  const notificationItems = useMemo(() => {
    const newLeads = leads.filter((lead) => lead.status === "New").length;
    const meetings = leads.filter(
      (lead) => lead.status === "Meeting Scheduled",
    ).length;
    const wonDeals = leads.filter((lead) => lead.status === "Won").length;

    return [
      {
        label: `${newLeads} new ${newLeads === 1 ? "lead" : "leads"} waiting`,
        description: "Review new prospects",
        status: "New",
        icon: UserPlus,
        tone: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
      },
      {
        label: `${meetings} ${meetings === 1 ? "meeting" : "meetings"} scheduled`,
        description: "Open your meeting pipeline",
        status: "Meeting Scheduled",
        icon: CalendarClock,
        tone: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
      },
      {
        label: `${wonDeals} ${wonDeals === 1 ? "deal" : "deals"} won`,
        description: "View successful conversions",
        status: "Won",
        icon: CheckCircle2,
        tone: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      },
    ];
  }, [leads]);

  useEffect(() => {
    const closePanels = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActivePanel(null);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setActivePanel(null);
    };

    document.addEventListener("mousedown", closePanels);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closePanels);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  useEffect(() => {
    if (activePanel === "search") {
      searchInputRef.current?.focus();
    }
  }, [activePanel]);

  const openSearch = () => {
    setActivePanel((current) => (current === "search" ? null : "search"));
  };

  const openNotifications = () => {
    setNotificationsRead(true);
    setActivePanel((current) =>
      current === "notifications" ? null : "notifications",
    );
  };

  const goToLeadSearch = (query) => {
    setActivePanel(null);
    setSearchQuery("");
    navigate(`/leads?search=${encodeURIComponent(query)}`);
  };

  const goToStatus = (status) => {
    setActivePanel(null);
    navigate(`/leads?status=${encodeURIComponent(status)}`);
  };

  return (
    <header
      ref={navbarRef}
      className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-gray-200/80 bg-white/80 px-6 backdrop-blur-xl transition-colors duration-200 dark:border-gray-700/80 dark:bg-gray-900/80 md:flex"
    >
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
          Workspace
        </p>
        <h2 className="text-sm font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>

      <div className="relative flex items-center gap-2">
        <button
          type="button"
          aria-label="Search workspace"
          aria-expanded={activePanel === "search"}
          onClick={openSearch}
          className={`grid size-11 place-items-center rounded-xl transition-colors duration-200 ${
            activePanel === "search"
              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          }`}
        >
          <Search className="size-3.5" />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          aria-expanded={activePanel === "notifications"}
          onClick={openNotifications}
          className={`relative grid size-11 place-items-center rounded-xl transition-colors duration-200 ${
            activePanel === "notifications"
              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          }`}
        >
          <Bell className="size-3.5" />
          {!notificationsRead && (
            <span className="absolute right-3 top-3 size-1.5 rounded-full bg-blue-500 ring-2 ring-white dark:ring-gray-900" />
          )}
        </button>

        <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-gray-700" />
        <DarkModeToggle compact />

        {activePanel === "search" && (
          <div className="absolute right-20 top-11 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/10 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-2 border-b border-gray-100 p-3 dark:border-gray-700">
              <Search className="size-4 text-gray-400" />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && searchQuery.trim()) {
                    goToLeadSearch(searchQuery.trim());
                  }
                }}
                placeholder="Search leads, companies, emails..."
                className="min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery("")}
                  className="rounded-md p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto p-2">
              {!searchQuery.trim() ? (
                <p className="px-3 py-6 text-center text-xs text-gray-400">
                  Type to search your CRM leads
                </p>
              ) : searchResults.length > 0 ? (
                searchResults.map((lead) => (
                  <button
                    key={lead.id || lead.email}
                    type="button"
                    onClick={() => goToLeadSearch(lead.name)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/60"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-[10px] font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      {lead.name
                        .split(" ")
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-gray-900 dark:text-white">
                        {lead.name}
                      </span>
                      <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
                        {lead.company} · {lead.status}
                      </span>
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-6 text-center text-xs text-gray-400">
                  No matching leads found
                </p>
              )}
            </div>
          </div>
        )}

        {activePanel === "notifications" && (
          <div className="absolute right-12 top-11 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-900/10 dark:border-gray-700 dark:bg-gray-800">
            <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-700">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Notifications
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Live pipeline summary
              </p>
            </div>
            <div className="p-2">
              {notificationItems.map(({ label, description, status, icon: Icon, tone }) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => goToStatus(status)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/60"
                >
                  <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${tone}`}>
                    <Icon className="size-3.5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                      {label}
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      {description}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
