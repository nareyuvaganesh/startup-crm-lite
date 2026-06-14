import { useState } from "react";
import { useLeads } from "../context/LeadContext";

import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import EmptyState from "../components/common/EmptyState";

import LeadForm from "../components/leads/LeadForm";
import LeadTable from "../components/leads/LeadTable";
import LeadCard from "../components/leads/LeadCard";

export default function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [editingLead, setEditingLead] = useState(null);

  const filteredLeads = leads
    .filter(
      (lead) =>
        activeFilter === "All" ||
        lead.status === activeFilter
    )
    .filter(
      (lead) =>
        lead.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        lead.company
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        lead.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

  return (
    <div className="p-6 bg-slate-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-6">
        Lead Management
      </h1>

      <LeadForm
        onAddLead={addLead}
        onUpdateLead={updateLead}
        editingLead={editingLead}
        onCancelEdit={() => setEditingLead(null)}
      />

      <div className="mb-4">
        <SearchBar
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
        />
      </div>

      <div className="mb-4">
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <div className="mb-6">
        {filteredLeads.length > 0 ? (
          <LeadTable leads={filteredLeads} />
        ) : (
          <EmptyState />
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filteredLeads.map((lead) => (
          <LeadCard
            key={lead.id || lead.email}
            lead={lead}
            onEdit={setEditingLead}
            onDelete={deleteLead}
          />
        ))}
      </div>
    </div>
  );
}