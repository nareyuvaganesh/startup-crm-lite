import { useState } from "react";
import { Settings as SettingsIcon, Bell, Monitor, Save } from "lucide-react";
import toast from "react-hot-toast";
import DarkModeToggle from "../components/common/DarkModeToggle";

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
    <div className="mx-auto w-full max-w-4xl space-y-5 lg:space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Configure application interface behavior, default values, and alerting systems.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-5 lg:space-y-6 [&_input]:min-h-11 [&_select]:min-h-11">
        {/* PANEL 1: Theme Preferences */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800 sm:p-6">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100 dark:border-gray-700/80">
            <Monitor className="text-blue-600 dark:text-blue-400 w-5 h-5" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Appearance & Theme
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                Application Theme Mode
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                Switch between light background layouts or darker contrast elements.
              </p>
            </div>

            <div className="min-w-44 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 dark:border-gray-700 dark:bg-gray-700">
              <DarkModeToggle />
            </div>
          </div>
        </div>

        {/* PANEL 2: Notifications Alerts */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800 sm:p-6">
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
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  Email Alerts
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Receive email copy updates on critical CRM notifications.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("emailAlerts")}
                aria-pressed={notifications.emailAlerts}
                className="inline-flex min-h-11 min-w-14 shrink-0 items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 ${
                  notifications.emailAlerts ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                }`}>
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                      notifications.emailAlerts ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </span>
              </button>
            </div>

            {/* Toggle Item 2: Lead Assignments */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  Lead Assignment Notifications
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Notify me immediately when a new lead is assigned to my profile.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("leadAssignment")}
                aria-pressed={notifications.leadAssignment}
                className="inline-flex min-h-11 min-w-14 shrink-0 items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 ${
                  notifications.leadAssignment ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                }`}>
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                      notifications.leadAssignment ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </span>
              </button>
            </div>

            {/* Toggle Item 3: Weekly Digest */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  Weekly Summary Digest
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Send a weekly performance report summary via email.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("weeklyDigest")}
                aria-pressed={notifications.weeklyDigest}
                className="inline-flex min-h-11 min-w-14 shrink-0 items-center justify-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <span className={`relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 ${
                  notifications.weeklyDigest ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                }`}>
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                      notifications.weeklyDigest ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* PANEL 3: System Defaults */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800 sm:p-6">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100 dark:border-gray-700/80">
            <SettingsIcon className="text-blue-600 dark:text-blue-400 w-5 h-5" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              System Default Preferences
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
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
        <div className="flex border-t border-gray-200 pt-4 dark:border-gray-700/80 sm:justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-75 sm:w-auto"
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
