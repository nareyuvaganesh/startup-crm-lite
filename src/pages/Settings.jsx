import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Settings as SettingsIcon, Sun, Moon, Bell, Monitor, Save } from "lucide-react";
import toast from "react-hot-toast";

/**
 * Settings Page Component
 * Renders settings panels configuration:
 * 1. Appearance Section: Integrated with ThemeContext to switch dark/light mode dynamically.
 * 2. Notification Preferences: Stateful checkbox switches for Email, Assignments, and Summary alerts.
 * 3. Default Preferences: Text and select fields configuring default Lead Owners, Currencies, and Sources.
 * 
 * @component
 */
export default function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();

  // Local state for notification settings
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    leadAssignment: true,
    weeklyDigest: false,
    systemLogs: false,
  });

  // Local state for system default values
  const [defaults, setDefaults] = useState({
    defaultOwner: "John Doe",
    defaultCurrency: "USD",
    defaultSource: "Website",
    recordsPerPage: "10",
  });

  const [isSaving, setIsSaving] = useState(false);

  // Toggle switch handler for checkboxes
  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Change handler for default fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDefaults((prev) => ({ ...prev, [name]: value }));
  };

  // Save settings form handler
  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully!");
    }, 700);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Configure application interface behavior, default values, and alerting systems.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* PANEL 1: Theme Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 p-6 transition-all duration-300">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100 dark:border-gray-700/80">
            <Monitor className="text-blue-600 dark:text-blue-400 w-5 h-5" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Appearance & Theme
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-250">
                Application Theme Mode
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                Switch between light background layouts or darker contrast elements.
              </p>
            </div>

            {/* Toggle Theme button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50 hover:bg-slate-100 dark:bg-gray-750 dark:hover:bg-gray-700 text-sm font-bold text-gray-700 dark:text-gray-200 cursor-pointer focus:outline-none transition-all duration-200"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500 stroke-[2.5]" />
                  <span>Switch to Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-500 stroke-[2.5]" />
                  <span>Switch to Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* PANEL 2: Notifications Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 p-6 transition-all duration-300">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100 dark:border-gray-700/80">
            <Bell className="text-blue-600 dark:text-blue-400 w-5 h-5" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Notification Preferences
            </h2>
          </div>

          <div className="space-y-4">
            {/* Toggle Item 1: Email Alerts */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-250">
                  Email Alerts
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Receive email copy updates on critical CRM notifications.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("emailAlerts")}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifications.emailAlerts ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-705"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    notifications.emailAlerts ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Toggle Item 2: Lead Assignments */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-250">
                  Lead Assignment Notifications
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Notify me immediately when a new lead is assigned to my profile.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("leadAssignment")}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifications.leadAssignment ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-705"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    notifications.leadAssignment ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Toggle Item 3: Weekly Digest */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-250">
                  Weekly Summary Digest
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Send a weekly performance report summary via email.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("weeklyDigest")}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifications.weeklyDigest ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-705"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    notifications.weeklyDigest ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* PANEL 3: System Defaults */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 p-6 transition-all duration-300">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100 dark:border-gray-700/80">
            <SettingsIcon className="text-blue-600 dark:text-blue-400 w-5 h-5" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              System Default Preferences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Default Owner */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Default Lead Owner
              </label>
              <input
                type="text"
                name="defaultOwner"
                value={defaults.defaultOwner}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-sm font-medium"
              />
            </div>

            {/* Default Currency */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Default Currency
              </label>
              <select
                name="defaultCurrency"
                value={defaults.defaultCurrency}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-sm font-medium"
              >
                <option value="USD">USD ($ - US Dollar)</option>
                <option value="EUR">EUR (€ - Euro)</option>
                <option value="GBP">GBP (£ - British Pound)</option>
                <option value="INR">INR (₹ - Indian Rupee)</option>
              </select>
            </div>

            {/* Default Lead Source */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Default Lead Source
              </label>
              <select
                name="defaultSource"
                value={defaults.defaultSource}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-sm font-medium"
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Email Campaign">Email Campaign</option>
                <option value="Cold Call">Cold Call</option>
              </select>
            </div>

            {/* Records per page */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Records per Page (Tables)
              </label>
              <select
                name="recordsPerPage"
                value={defaults.recordsPerPage}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-sm font-medium"
              >
                <option value="5">5 records</option>
                <option value="10">10 records</option>
                <option value="25">25 records</option>
                <option value="50">50 records</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form controls button footer */}
        <div className="flex justify-end pt-4 border-t border-gray-150 dark:border-gray-700/80">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer focus:outline-none disabled:opacity-75 focus:ring-2 focus:ring-blue-500/50 shadow-md hover:shadow-lg transition-all"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving settings...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
