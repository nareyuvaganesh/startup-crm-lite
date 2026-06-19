import { useEffect, useMemo, useRef, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Bell, Menu, Rocket, Search, X } from "lucide-react";
import DarkModeToggle from "./components/common/DarkModeToggle";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import { useLeads } from "./context/LeadContext";
import AppRoutes from "./routes";

/**
 * Shared responsive application shell rendered inside BrowserRouter.
 */
function AppLayout() {
  const navigate = useNavigate();
  const { leads } = useLeads();
  const headerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return leads
      .filter((lead) =>
        [lead.name, lead.company, lead.email].some((value) =>
          String(value || "").toLowerCase().includes(query),
        ),
      )
      .slice(0, 4);
  }, [leads, searchQuery]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActivePanel(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActivePanel(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleMobileMenu = () => {
    setActivePanel(null);
    setIsMobileMenuOpen((current) => !current);
  };

  const togglePanel = (panel) => {
    setIsMobileMenuOpen(false);
    setActivePanel((current) => (current === panel ? null : panel));
  };

  const openLead = (leadName) => {
    setActivePanel(null);
    setSearchQuery("");
    navigate(`/leads?search=${encodeURIComponent(leadName)}`);
  };

  return (
    <div className="min-h-screen overflow-x-clip bg-gray-50 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-white">
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200/80 bg-white/90 px-2 shadow-sm backdrop-blur-xl dark:border-gray-700/80 dark:bg-gray-900/90 md:hidden"
      >
        <div className="flex min-w-0 items-center gap-1">
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            className="grid size-11 shrink-0 place-items-center rounded-2xl text-gray-600 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <div className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/20">
            <Rocket className="size-4" aria-hidden="true" />
          </div>

          <span className="ml-1 truncate text-sm font-extrabold tracking-tight text-gray-900 dark:text-white">
            CRM Lite
          </span>
        </div>

        <div className="flex shrink-0 items-center">
          <button
            type="button"
            aria-label="Search"
            aria-expanded={activePanel === "search"}
            onClick={() => togglePanel("search")}
            className={`grid size-11 place-items-center rounded-2xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              activePanel === "search"
                ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            }`}
          >
            <Search className="size-4" />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            aria-expanded={activePanel === "notifications"}
            onClick={() => togglePanel("notifications")}
            className={`relative grid size-11 place-items-center rounded-2xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              activePanel === "notifications"
                ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            }`}
          >
            <Bell className="size-4" />
          </button>

          <DarkModeToggle compact />
        </div>

        {activePanel === "search" && (
          <div className="absolute inset-x-2 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-2 border-b border-gray-100 p-3 dark:border-gray-700">
              <Search className="size-4 shrink-0 text-gray-400" />
              <input
                type="search"
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && searchQuery.trim()) {
                    navigate(`/leads?search=${encodeURIComponent(searchQuery.trim())}`);
                    setActivePanel(null);
                    setSearchQuery("");
                  }
                }}
                placeholder="Search leads, contacts, reports..."
                className="min-h-11 min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="grid size-11 shrink-0 place-items-center rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <div className="max-h-64 overflow-y-auto p-2">
              {!searchQuery.trim() ? (
                <p className="px-3 py-5 text-center text-sm text-gray-500 dark:text-gray-400">
                  Search leads, contacts, reports...
                </p>
              ) : searchResults.length > 0 ? (
                searchResults.map((lead) => (
                  <button
                    key={lead.id || lead.email}
                    type="button"
                    onClick={() => openLead(lead.name)}
                    className="flex min-h-11 w-full min-w-0 items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700/60"
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
                        {lead.company}
                      </span>
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-5 text-center text-sm text-gray-500 dark:text-gray-400">
                  No matching results
                </p>
              )}
            </div>
          </div>
        )}

        {activePanel === "notifications" && (
          <div className="absolute right-2 top-[calc(100%+0.5rem)] w-72 max-w-[calc(100vw-1rem)] rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto grid size-10 place-items-center rounded-xl bg-gray-100 text-gray-400 dark:bg-gray-700">
              <Bell className="size-4" />
            </div>
            <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">
              No new notifications
            </p>
          </div>
        )}
      </header>

      <div className="flex flex-col md:flex-row">
        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={() => setIsMobileMenuOpen(false)}
        />

        <div className="min-w-0 max-w-full flex-1">
          <Navbar />

          <main className="min-w-0 max-w-full p-4 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-20 text-gray-900 transition-colors duration-200 dark:text-white md:p-5 lg:p-6">
            <AppRoutes />
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
