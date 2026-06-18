import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useProfile } from "../context/ProfileContext";

/**
 * Profile Page Component
 * Renders the user profile management interface.
 * Features:
 * - A high-fidelity user profile highlight card on the left/top.
 * - An editable details form on the right/bottom to change account fields.
 * - Form validation (email, phone, text lengths).
 * - Simulated save state with toast success notification.
 * 
 * @component
 */
export default function Profile() {
  const { profile, setProfile } = useProfile();

  const [formState, setFormState] = useState({ ...profile });
  const [isSaving, setIsSaving] = useState(false);

  // Form input changes handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Profile save updates handler
  const handleSaveChanges = (e) => {
    e.preventDefault();

    // Standard Email pattern validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Phone verification (must be a number and between 8-15 digits)
    const phoneDigits = formState.phone.replace(/\D/g, "");
    if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      toast.error("Please enter a valid phone number (8-15 digits).");
      return;
    }

    // Text field validation
    if (!formState.firstName.trim() || !formState.lastName.trim()) {
      toast.error("First name and last name cannot be empty.");
      return;
    }

    setIsSaving(true);

    // Simulate asynchronous network request
    setTimeout(() => {
      setProfile({ ...formState });
      setIsSaving(false);
      toast.success("Profile updated successfully!");
    }, 800);
  };

  // Reset form to active profile fields
  const handleCancel = () => {
    setFormState({ ...profile });
    toast.success("Changes discarded.");
  };

  const userInitials = `${profile.firstName.slice(0, 1)}${profile.lastName.slice(0, 1)}`.toUpperCase();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 lg:space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          My Profile
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your account profile details and business contact settings.
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-3 lg:gap-6">
        {/* Left Column: User Profile Overview Card */}
        <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-4 text-center shadow-md transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800 sm:p-6 lg:col-span-1">
          <div className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl font-black border-4 border-blue-50 dark:border-blue-900/10">
            {userInitials}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" title="Active Account" />
          </div>

          <h3 className="break-words text-xl font-bold text-gray-900 dark:text-white">
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
            {profile.role}
          </p>
          <p className="mt-1 break-words text-xs text-gray-400 dark:text-gray-500">
            {profile.department} • {profile.company}
          </p>

          <hr className="my-5 border-gray-100 dark:border-gray-700/80" />

          {/* Quick Info Details */}
          <div className="space-y-3.5 text-left text-sm">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="truncate" title={profile.email}>
                {profile.email}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="min-w-0 break-words">{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="min-w-0 break-words">{profile.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="min-w-0 break-words">Joined {profile.joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Account Details */}
        <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-md transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800 sm:p-6 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-100 dark:border-gray-700/80">
            <User className="text-blue-600 dark:text-blue-400 w-5 h-5" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Edit Account Information
            </h2>
          </div>

          <form onSubmit={handleSaveChanges} className="space-y-5 [&_input]:min-h-11">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {/* First Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="min-h-11 w-full rounded-xl border border-gray-200 bg-transparent px-4 py-2.5 text-sm font-medium text-gray-900 transition-all placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400/30"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-sm font-medium"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-sm font-medium"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-sm font-medium"
                />
              </div>

              {/* Company */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formState.company}
                  onChange={handleInputChange}
                  placeholder="Company"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-sm font-medium"
                />
              </div>

              {/* Job Title / Role */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Job Title
                </label>
                <input
                  type="text"
                  name="role"
                  value={formState.role}
                  onChange={handleInputChange}
                  placeholder="Job title"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-sm font-medium"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-sm font-medium"
                />
              </div>

              {/* Department */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formState.department}
                  onChange={handleInputChange}
                  placeholder="Department"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-sm font-medium"
                />
              </div>
            </div>

            {/* Buttons control footer panel */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-4 dark:border-gray-700/80 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="min-h-11 w-full rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-slate-50 focus:outline-none disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/50 sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-75 sm:w-auto"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
