// Import useState to manage form inputs locally.
import { useState } from "react";

/**
 * LeadForm component
 * Renders a form to add new leads or edit existing leads.
 * State is initialized based on whether editingLead is provided.
 */
export default function LeadForm({
  onAddLead,
  onUpdateLead,
  editingLead,
  onCancelEdit,
}) {
  // Local state holding the input form values, initialized with editing lead properties if editing.
  const [formData, setFormData] = useState({
    name: editingLead?.name || "",
    company: editingLead?.company || "",
    email: editingLead?.email || "",
    phone: editingLead?.phone || "",
    status: editingLead?.status || "New",
    source: editingLead?.source || "Website",
    value: editingLead?.value || "",
  });

  // Handle text, number and select input changes and update the local state.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Reset the form data to empty values.
  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      status: "New",
      source: "Website",
      value: "",
    });
  };

  // Process and submit the form data to the parent controllers.
  const handleSubmit = (e) => {
    // Prevent the default browser form submission refresh behavior.
    e.preventDefault();

    // Perform validation: Name and Company fields are strictly required.
    if (!formData.name || !formData.company) {
      alert("Name and Company are required");
      return;
    }

    // Format fields (convert numeric value input to number, default to 0 if empty).
    const formattedData = {
      ...formData,
      value: formData.value ? Number(formData.value) : 0,
      responseTime: editingLead?.responseTime || parseFloat((Math.random() * 8 + 0.5).toFixed(1))
    };

    // Call appropriate handler depending on whether it is an update or create operation.
    if (editingLead) {
      onUpdateLead(editingLead.id, formattedData);
      onCancelEdit();
    } else {
      onAddLead(formattedData);
    }

    // Clear form inputs.
    resetForm();
  };

  return (
    // Form container styled for light/dark modes with transitions
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6 transition-colors duration-200"
    >
      {/* Title indicating form mode (Add vs Edit) */}
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        {editingLead ? "Edit Lead" : "Add Lead"}
      </h2>

      {/* Input container grid spacing */}
      <div className="grid gap-3">
        {/* Name text input field */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        {/* Company name text input field */}
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        {/* Email input field */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        {/* Phone text input field */}
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        {/* Numeric value input representing lead size / potential deal revenue in USD */}
        <input
          type="number"
          name="value"
          placeholder="Lead Value (USD)"
          value={formData.value}
          onChange={handleChange}
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        {/* Lead Source selection dropdown menu */}
        <select
          name="source"
          value={formData.source}
          onChange={handleChange}
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Email Campaign">Email Campaign</option>
          <option value="Cold Call">Cold Call</option>
        </select>

        {/* Lead Status selection dropdown menu */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Meeting Scheduled</option>
          <option>Proposal Sent</option>
          <option>Won</option>
          <option>Lost</option>
        </select>

        {/* Action submit button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          {editingLead ? "Update Lead" : "Add Lead"}
        </button>

        {/* Conditional Cancel Edit button visible only during update modes */}
        {editingLead && (
          <button
            type="button"
            onClick={() => {
              resetForm();
              onCancelEdit();
            }}
            className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600 cursor-pointer"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}