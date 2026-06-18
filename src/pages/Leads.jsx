import { useState, useEffect } from "react";
import { useLeads } from "../context/LeadContext";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import EmptyState from "../components/common/EmptyState";
import LeadForm from "../components/leads/LeadForm";
import LeadTable from "../components/leads/LeadTable";
import LeadCard from "../components/leads/LeadCard";
import { AlertTriangle, LayoutGrid, List, Plus, X } from "lucide-react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

/**
 * Leads Page Component
 * The main container for  CRUD workflow:
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
  const [searchParams] = useSearchParams();

  // Search, Filter and View states
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("search") || "",
  );
  const [activeFilter, setActiveFilter] = useState(
    () => searchParams.get("status") || "All",
  );
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'

  // Modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadPendingDelete, setLeadPendingDelete] = useState(null);

  // Keyboard listener to close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (leadPendingDelete) {
          setLeadPendingDelete(null);
        } else if (isModalOpen) {
          handleCloseModal();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, leadPendingDelete]);

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
      toast.success("Lead updated successfully");
    } else {
      // Create mode: append new lead
      addLead(data);
      toast.success("Lead added successfully");
    }
    handleCloseModal();
  };

  // Delete Lead handler
  const handleDeleteLead = (id) => {
    const leadToDelete = leads.find((lead) => lead.id === id);
    if (leadToDelete) {
      setLeadPendingDelete(leadToDelete);
    }
  };

  const handleConfirmDelete = () => {
    if (!leadPendingDelete) return;

    deleteLead(leadPendingDelete.id);
    setLeadPendingDelete(null);
    toast.success("Lead deleted successfully");
  };

  // Derived filtered leads based on selected filter and text query search matches
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
    <div className="mx-auto max-w-7xl space-y-5 lg:space-y-6">
      {/* Page header and add button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Lead Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Maintain, customize, and filter prospect contacts pipeline records.
          </p>
        </div>

        {/* Add Lead trigger button */}
        <button
          onClick={handleOpenCreateModal}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-[0.99] focus:outline-none sm:w-auto"
        >
          <Plus size={16} className="stroke-[2.5]" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Control panel bar (Search + View Toggler) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200/40 dark:border-gray-700/50 p-4 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
        {/* Search Input wrapper */}
        <div className="w-full md:max-w-md">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Layout Mode Toggler (Desktop Only) */}
        <div className="hidden items-center gap-1 rounded-xl border border-gray-200/50 bg-slate-100 p-1 dark:border-gray-700 dark:bg-gray-700 md:flex lg:hidden">
          {/* Table view select button */}
          <button
            onClick={() => setViewMode("table")}
            aria-label="Table View Mode"
            className={`grid min-h-11 min-w-11 place-items-center rounded-lg transition-all ${viewMode === "table"
              ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-xs"
              : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
          >
            <List size={18} />
          </button>
          {/* Card view select button */}
          <button
            onClick={() => setViewMode("card")}
            aria-label="Card View Mode"
            className={`grid min-h-11 min-w-11 place-items-center rounded-lg transition-all ${viewMode === "card"
              ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-xs"
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
            <div className={viewMode === "table" ? "hidden md:block" : "hidden lg:block"}>
              <LeadTable
                leads={filteredLeads}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteLead}
              />
            </div>

            {/* Card Grid View: Visible on mobile, or desktop when viewMode === 'card' */}
            <div className={viewMode === "card" ? "block lg:hidden" : "block md:hidden"}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-0 backdrop-blur-xs transition-opacity duration-300 md:p-4">
          {/* Backdrop close mask trigger */}
          <div className="absolute inset-0" onClick={handleCloseModal} />

          {/* Dialog popup card */}
          <div className="relative z-10 h-dvh w-full overflow-y-auto border-gray-100 bg-white p-4 shadow-2xl transition-all dark:border-gray-700/60 dark:bg-gray-800 md:h-auto md:max-h-[90vh] md:max-w-lg md:rounded-2xl md:border md:p-6">
            {/* Modal header details */}
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100 dark:border-gray-700/60">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedLead ? "Edit Prospect Details" : "Create New Lead"}
              </h2>
              <button
                onClick={handleCloseModal}
                aria-label="Close form modal"
                className="grid min-h-11 min-w-11 place-items-center rounded-xl text-gray-400 hover:bg-slate-100 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-700/60"
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

      {/* DELETE CONFIRMATION DIALOG */}
      {leadPendingDelete && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={() => setLeadPendingDelete(null)}
            aria-label="Cancel deleting lead"
          />

          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
              <AlertTriangle size={21} aria-hidden="true" />
            </div>

            <h2
              id="delete-dialog-title"
              className="text-lg font-bold text-gray-900 dark:text-white"
            >
              Delete lead?
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this lead?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setLeadPendingDelete(null)}
                className="min-h-11 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="min-h-11 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/40"
              >
                Delete lead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
