import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import sampleLeads from "../data/sampleLeads";

export const LeadContext = createContext();

export function LeadProvider({ children }) {
  const [leads, setLeads] = useLocalStorage(
    "startup-crm-leads",
    sampleLeads
  );

  const addLead = (lead) => {
    const newLead = {
      ...lead,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setLeads([...leads, newLead]);
  };

  const updateLead = (id, updatedLead) => {
    setLeads(
      leads.map((lead) =>
        lead.id === id
          ? { ...lead, ...updatedLead }
          : lead
      )
    );
  };

  const deleteLead = (id) => {
    setLeads(
      leads.filter((lead) => lead.id !== id)
    );
  };

  const getLeadById = (id) => {
    return leads.find((lead) => lead.id === id);
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        addLead,
        updateLead,
        deleteLead,
        getLeadById,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error(
      "useLeads must be used inside LeadProvider"
    );
  }

  return context;
}