import { useEffect, useState } from "react";

export default function LeadForm({
  onAddLead,
  onUpdateLead,
  editingLead,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "New",
  });

  useEffect(() => {
    if (editingLead) {
      setFormData({
        name: editingLead.name || "",
        company: editingLead.company || "",
        email: editingLead.email || "",
        phone: editingLead.phone || "",
        status: editingLead.status || "New",
      });
    }
  }, [editingLead]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      status: "New",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.company) {
      alert("Name and Company are required");
      return;
    }

    if (editingLead) {
      onUpdateLead(editingLead.id, formData);
      onCancelEdit();
    } else {
      onAddLead(formData);
    }

    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6 transition-colors duration-200"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        {editingLead ? "Edit Lead" : "Add Lead"}
      </h2>

      <div className="grid gap-3">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

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

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {editingLead ? "Update Lead" : "Add Lead"}
        </button>

        {editingLead && (
          <button
            type="button"
            onClick={() => {
              resetForm();
              onCancelEdit();
            }}
            className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}