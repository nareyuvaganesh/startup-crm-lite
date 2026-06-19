/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import sampleLeads from "../data/sampleLeads";

/**
 * TypeScript-style shape of a Lead object.
 *
 * @typedef {object} Lead
 * @property {string} id - Unique identifier for the lead (UUID)
 * @property {string} name - Full name of the lead contact
 * @property {string} company - Company/Organization name
 * @property {string} email - Email address
 * @property {string} phone - Contact phone number
 * @property {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} status - Pipeline progress status
 * @property {'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other'} source - Origin of the lead prospect
 * @property {number} value - Estimated deal value in USD
 * @property {number} amount - Revenue amount used when the lead is won
 * @property {string} createdAt - ISO 8601 date string representation
 */

/**
 * Lead React Context Object
 */
export const LeadContext = createContext();

/**
 * LeadProvider component that manages Lead state and mutations, storing them in localStorage.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider
 * @returns {React.JSX.Element} The Provider component wrapping the children
 */
export function LeadProvider({ children }) {
  const [leads, setLeads] = useLocalStorage(
    "startup-crm-leads",
    sampleLeads
  );

  /**
   * Appends a new lead record to the database, automatically adding an ID and createdAt timestamp.
   *
   * @param {Omit<Lead, 'id' | 'createdAt'>} lead - Lead information to add (without id and createdAt)
   */
  const addLead = useCallback((lead) => {
    const newLead = {
      ...lead,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setLeads((currentLeads) => [...currentLeads, newLead]);
  }, [setLeads]);

  /**
   * Updates fields of an existing lead record by matching its unique ID.
   *
   * @param {string} id - The ID of the lead to update
   * @param {Partial<Lead>} updatedLead - The partial lead fields to update
   */
  const updateLead = useCallback((id, updatedLead) => {
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === id
          ? { ...lead, ...updatedLead }
          : lead
      )
    );
  }, [setLeads]);

  /**
   * Deletes a lead record matching the specified ID from the state.
   *
   * @param {string} id - The ID of the lead to delete
   */
  const deleteLead = useCallback((id) => {
    setLeads((currentLeads) =>
      currentLeads.filter((lead) => lead.id !== id)
    );
  }, [setLeads]);

  /**
   * Retrieves a single lead object from the current state matching the specified ID.
   *
   * @param {string} id - The ID of the lead to retrieve
   * @returns {Lead | undefined} The matching lead object, or undefined if not found
   */
  const getLeadById = useCallback(
    (id) => leads.find((lead) => lead.id === id),
    [leads],
  );

  const contextValue = useMemo(
    () => ({ leads, addLead, updateLead, deleteLead, getLeadById }),
    [leads, addLead, updateLead, deleteLead, getLeadById],
  );

  return (
    <LeadContext.Provider value={contextValue}>
      {children}
    </LeadContext.Provider>
  );
}

/**
 * Custom React hook to consume the LeadContext.
 * Throws an error if used outside a LeadProvider wrapper.
 *
 * @returns {{
 *   leads: Lead[],
 *   addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void,
 *   updateLead: (id: string, updatedLead: Partial<Lead>) => void,
 *   deleteLead: (id: string) => void,
 *   getLeadById: (id: string) => Lead | undefined
 * }} The lead state data and mutation methods
 * @throws {Error} If context is consumed outside of the LeadProvider component
 */
export function useLeads() {
  const context = useContext(LeadContext);

  if (!context) {
    throw new Error(
      "useLeads must be used inside LeadProvider"
    );
  }

  return context;
}
