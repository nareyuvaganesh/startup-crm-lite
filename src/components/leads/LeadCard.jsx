import StatusBadge from "./StatusBadge";
import { Pencil, Trash2, Mail, Phone, Building2 } from "lucide-react";

/**
 * LeadCard component
 * Renders a high-fidelity card summarizing details of a single lead.
 * Features:
 * - Clear title display of the prospect name.
 * - Icon-guided details for Company, Email, and Phone number.
 * - Pill-shaped Status badge.
 * - Quick administrative actions: Edit (Pencil) and Delete (Trash2).
 * 
 * @component
 * @param {object} props - Component props
 * @param {object} props.lead - The lead data object to display
 * @param {function} props.onEdit - Callback function invoked on clicking Edit
 * @param {function} props.onDelete - Callback function invoked on clicking Delete
 */
export default function LeadCard({ lead, onEdit, onDelete }) {
  if (!lead) return null;

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700/50 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 ease-in-out group flex flex-col justify-between min-h-[220px]">
      <div>
        {/* Header row with Name and Status Badge */}
        <div className="flex justify-between items-start gap-2 mb-3">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
              {lead.name}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 stroke-[2]" />
              <span>{lead.company}</span>
            </div>
          </div>
          <StatusBadge status={lead.status} />
        </div>

        {/* Detailed parameters */}
        <div className="space-y-2 text-sm mt-4">
          {lead.email && (
            <div className="flex items-center gap-2.5 text-gray-600 dark:text-gray-300">
              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
              <a 
                href={`mailto:${lead.email}`} 
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate focus:outline-none"
              >
                {lead.email}
              </a>
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-2.5 text-gray-600 dark:text-gray-300">
              <Phone className="w-4 h-4 text-gray-400 shrink-0" />
              <a 
                href={`tel:${lead.phone}`} 
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none"
              >
                {lead.phone}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Action panel footer */}
      <div className="flex items-center justify-end gap-2 mt-5 pt-3 border-t border-gray-50 dark:border-gray-700/50">
        {/* Edit button */}
        <button
          onClick={() => onEdit(lead)}
          aria-label={`Edit lead ${lead.name}`}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-gray-500 transition-all hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
        >
          <Pencil className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Delete button */}
        <button
          onClick={() => onDelete(lead.id)}
          aria-label={`Delete lead ${lead.name}`}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-gray-500 transition-all hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/30 dark:text-gray-400 dark:hover:bg-red-950/20 dark:hover:text-red-400"
        >
          <Trash2 className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
}
