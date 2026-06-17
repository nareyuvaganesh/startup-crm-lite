import { useState, useEffect } from "react";
import { useLeads } from "../context/LeadContext";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import EmptyState from "../components/common/EmptyState";
import LeadForm from "../components/leads/LeadForm";
import LeadTable from "../components/leads/LeadTable";
import LeadCard from "../components/leads/LeadCard";
import { LayoutGrid, List, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

/**
 * Leads Page Component
 * The main container for Lead Management CRUD workflow:
 * - Fetches lead records and mutations from LeadContext.
 * - Manages modal visibility, active editing lead selection, and view toggle mode (card/table).
 * - Applies text query searches and status categories filters.
 * - Triggers success (green) toasts on create/update and error (red) toasts on deletion.
 * - Handles Escape keypress listener to close modals.
 * 
 * @component
 */
export default function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();

  // Search, Filter and View states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Keyboard listener to close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Open modal for creating a new lead
  const handleOpenCreateModal = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing lead
  const handleOpenEditModal = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  // Close form modal
  function handleCloseModal() {
    setSelectedLead(null);
    setIsModalOpen(false);
  }

  // Create or Update Lead handler
  const handleFormSubmit = (data) => {
    if (selectedLead) {
      // Edit mode: update existing lead record
      updateLead(selectedLead.id, data);
      toast.success("Lead details updated successfully!", {
        style: {
          border: '1px solid #22c55e',
          padding: '16px',
          color: '#15803d',
          background: '#f0fdf4',
        },
        iconTheme: {
          primary: '#22c55e',
          secondary: '#fff',
        },
      });
    } else {
      // Create mode: append new lead
      addLead(data);
      toast.success("New lead created successfully!", {
        style: {
          border: '1px solid #22c55e',
          padding: '16px',
          color: '#15803d',
          background: '#f0fdf4',
        },
        iconTheme: {
          primary: '#22c55e',
          secondary: '#fff',
        },
      });
    }
    handleCloseModal();
  };

  // Delete Lead handler
  const handleDeleteLead = (id) => {
    const leadToDelete = leads.find((l) => l.id === id);
    const name = leadToDelete ? leadToDelete.name : "Lead";
    
    deleteLead(id);
    toast.error(`"${name}" was deleted from records`, {
      style: {
        border: '1px solid #ef4444',
        padding: '16px',
        color: '#b91c1c',
        background: '#fef2f2',
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff',
      },
    });
  };

  const filteredLeads = leads
    .filter(
      (lead) =>
        activeFilter === "All" || lead.status === activeFilter
    )
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveFilter("All");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page header and add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Lead Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Maintain, customize, and filter prospect contacts pipeline records.
          </p>
        </div>

        {/* Add Lead trigger button */}
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white py-2.5 px-4 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-sm cursor-pointer focus:outline-none"
        >
          <Plus size={16} className="stroke-[2.5]" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Control panel bar (Search + View Toggler) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-150/40 dark:border-gray-700/50 p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
        {/* Search Input wrapper */}
        <div className="w-full md:max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Layout Mode Toggler (Desktop Only) */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-gray-750 p-1 rounded-xl border border-gray-200/50 dark:border-gray-700">
          {/* Table view select button */}
          <button
            onClick={() => setViewMode("table")}
            aria-label="Table View Mode"
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              viewMode === "table"
                ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-450 shadow-xs"
                : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <List size={18} />
          </button>
          {/* Card view select button */}
          <button
            onClick={() => setViewMode("card")}
            aria-label="Card View Mode"
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              viewMode === "card"
                ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-450 shadow-xs"
                : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {/* Status Filter Tab row */}
      <div className="w-full overflow-x-auto pb-1">
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          leads={leads}
        />
      </div>

      {/* Main View contents wrapper */}
      <div className="w-full">
        {filteredLeads.length === 0 ? (
          <EmptyState
            isFiltered={leads.length > 0}
            onClearFilters={leads.length > 0 ? handleClearFilters : undefined}
          />
        ) : (
          <>
            {/* Tablet/Desktop Table View: Hidden on mobile, visible on desktop when viewMode === 'table' */}
            <div className={viewMode === "table" ? "hidden md:block" : "hidden"}>
              <LeadTable 
                leads={filteredLeads} 
                onEdit={handleOpenEditModal} 
                onDelete={handleDeleteLead} 
              />
            </div>

            {/* Card Grid View: Visible on mobile, or desktop when viewMode === 'card' */}
            <div className={viewMode === "card" ? "block" : "block md:hidden"}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead.id || lead.email}
                    lead={lead}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteLead}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* MODAL DIALOG OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300">
          {/* Backdrop close mask trigger */}
          <div className="absolute inset-0" onClick={handleCloseModal} />

          {/* Dialog popup card */}
          <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700/60 p-6 z-10 transition-all transform scale-100 max-h-[90vh] overflow-y-auto">
            {/* Modal header details */}
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100 dark:border-gray-700/60">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedLead ? "Edit Prospect Details" : "Create New Lead"}
              </h2>
              <button
                onClick={handleCloseModal}
                aria-label="Close form modal"
                className="p-1 rounded-lg text-gray-450 hover:bg-slate-100 dark:hover:bg-gray-700/60 cursor-pointer focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal body LeadForm component */}
            <LeadForm
              key={selectedLead ? selectedLead.id : "new"}
              initialData={selectedLead}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}