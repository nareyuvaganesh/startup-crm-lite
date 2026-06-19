import { useState } from "react";
import { PlusCircle, CheckCircle, XCircle } from "lucide-react";
import { SOURCE_OPTIONS, STATUS_OPTIONS } from "../../constants";

/**
 * LeadForm component
 * A stateful form used to create or edit lead parameters.
 * Features:
 * - Stateful forms holding Name, Company, Email, Phone, Value, Status, and Source.
 * - Input validation: Name, Company, and Email are marked required and display Warning indicators.
 * - Supports keyboard layout controls (Cancel, Submit, field tabs).
 * 
 * @component
 * @param {object} props - Component props
 * @param {object} [props.initialData] - Existing lead object to prepopulate inputs (for edit mode)
 * @param {function} props.onSubmit - Submission callback returning formatted lead data
 * @param {function} props.onCancel - Callback triggering form dismissals
 */
export default function LeadForm({ initialData = null, onSubmit, onCancel }) {
  // Input fields state
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    company: initialData?.company || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    value: initialData?.value !== undefined ? String(initialData.value) : "",
    status: initialData?.status || "New",
    source: initialData?.source || "Website",
  });

  // Validation warning triggers state
  const [errors, setErrors] = useState({
    name: "",
    company: "",
    email: "",
  });

  // Input value changes handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate Company
    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Enter a valid email address";
      }
    }

    // If there are validation errors, set them and block submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare and sanitise data payload
    const leadPayload = {
      ...formData,
      value: formData.value ? Number(formData.value) : 0,
      amount: formData.value ? Number(formData.value) : 0,
    };

    onSubmit(leadPayload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Name Input */}
        <div className="space-y-1">
          <label htmlFor="lead-name" className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Contact Name *
          </label>
          <input
            id="lead-name"
            type="text"
            autoFocus
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Sarah Connor"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "lead-name-error" : undefined}
            className={`min-h-11 w-full rounded-xl border bg-transparent px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white dark:focus:ring-blue-400/30 ${
              errors.name ? "border-red-500 focus:ring-red-500/30" : "border-gray-200 dark:border-gray-700"
            }`}
          />
          {errors.name && (
            <p id="lead-name-error" role="alert" className="text-red-600 dark:text-red-400 text-xs font-bold mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Company Input */}
        <div className="space-y-1">
          <label htmlFor="lead-company" className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Company Name *
          </label>
          <input
            id="lead-company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="e.g. Cyberdyne Systems"
            required
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "lead-company-error" : undefined}
            className={`min-h-11 w-full rounded-xl border bg-transparent px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white dark:focus:ring-blue-400/30 ${
              errors.company ? "border-red-500 focus:ring-red-500/30" : "border-gray-200 dark:border-gray-700"
            }`}
          />
          {errors.company && (
            <p id="lead-company-error" role="alert" className="text-red-600 dark:text-red-400 text-xs font-bold mt-1">
              {errors.company}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <label htmlFor="lead-email" className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Email Address *
          </label>
          <input
            id="lead-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. sarah@cyberdyne.com"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "lead-email-error" : undefined}
            className={`min-h-11 w-full rounded-xl border bg-transparent px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-white dark:focus:ring-blue-400/30 ${
              errors.email ? "border-red-500 focus:ring-red-500/30" : "border-gray-200 dark:border-gray-700"
            }`}
          />
          {errors.email && (
            <p id="lead-email-error" role="alert" className="text-red-600 dark:text-red-400 text-xs font-bold mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Input */}
        <div className="space-y-1">
          <label htmlFor="lead-phone" className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Phone Number
          </label>
          <input
            id="lead-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. +1 555-0199"
            className="min-h-11 w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400/30"
          />
        </div>

        {/* Value Input */}
        <div className="space-y-1">
          <label htmlFor="lead-value" className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Lead Value (USD)
          </label>
          <input
            id="lead-value"
            type="number"
            min="0"
            name="value"
            value={formData.value}
            onChange={handleChange}
            placeholder="e.g. 15000"
            className="min-h-11 w-full rounded-xl border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:text-white dark:focus:ring-blue-400/30"
          />
        </div>

        {/* Lead Source Selector */}
        <div className="space-y-1">
          <label htmlFor="lead-source" className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Lead Source
          </label>
          <select
            id="lead-source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="min-h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400/30"
          >
            {SOURCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Lead Status Selector */}
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="lead-status" className="block text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Lead Status
          </label>
          <select
            id="lead-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="min-h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400/30"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Footer controls container */}
      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-4 dark:border-gray-700/80 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-slate-50 focus:outline-none dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/50"
        >
          <XCircle size={15} />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          {initialData ? (
            <>
              <CheckCircle size={15} />
              <span>Update Lead</span>
            </>
          ) : (
            <>
              <PlusCircle size={15} />
              <span>Create Lead</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
