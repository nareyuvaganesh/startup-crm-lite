import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

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
  // Initial user state
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@startupcrm.io",
    phone: "9876543210",
    company: "Acme Enterprises",
    role: "Founder & CEO",
    location: "San Francisco, CA",
    joinedDate: "June 2025",
    department: "Executive Operations",
  });

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
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          My Profile
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your account profile details and business contact settings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column: User Profile Overview Card */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 p-6 text-center transition-all duration-300">
          <div className="relative w-24 h-24 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl font-black border-4 border-blue-50 dark:border-blue-900/10">
            {userInitials}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" title="Active Account" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
            {profile.role}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {profile.department} • {profile.company}
          </p>

          <hr className="my-5 border-gray-100 dark:border-gray-700/80" />

          {/* Quick Info Details */}
          <div className="space-y-3.5 text-left text-sm">
            <div className="flex items-center gap-3 text-gray-650 dark:text-gray-300">
              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="truncate" title={profile.email}>
                {profile.email}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-650 dark:text-gray-300">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-650 dark:text-gray-300">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-650 dark:text-gray-300">
              <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
              <span>Joined {profile.joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Account Details */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 p-6 transition-all duration-300">
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-100 dark:border-gray-700/80">
            <User className="text-blue-600 dark:text-blue-400 w-5 h-5" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Edit Account Information
            </h2>
          </div>

          <form onSubmit={handleSaveChanges} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-sm font-medium"
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
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-150 dark:border-gray-700/80">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-650 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700 cursor-pointer focus:outline-none disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer focus:outline-none disabled:opacity-75 focus:ring-2 focus:ring-blue-500/50 shadow-md"
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
