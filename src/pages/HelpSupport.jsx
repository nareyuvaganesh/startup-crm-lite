import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Mail, BookOpen, Send, PhoneCall } from "lucide-react";
import toast from "react-hot-toast";

/**
 * HelpSupport Page Component
 * Renders support tools:
 * 1. Interactive Accordion FAQ: Toggles open/close states to view solutions to common user questions.
 * 2. Quick Help Guides: Quick reference highlights about CRM capabilities.
 * 3. Contact Support Form: Stateful messaging client that validates and triggers simulated ticket submission.
 * 
 * @component
 */
export default function HelpSupport() {
  // FAQ questions list dataset
  const faqs = [
    {
      question: "How do I export my lead database?",
      answer: "Navigate to the Dashboard page. Under the 'Quick Actions' panel, click the 'Export Data (CSV)' button. The system will compile all leads into a sanitized CSV file and trigger a local file download.",
    },
    {
      question: "Can I add custom sources to my leads?",
      answer: "Yes. When adding or modifying a lead in the Leads management panel, you can select from various lead sources (e.g. Website, Referral, LinkedIn, Email Campaign, Cold Call) in the Lead Form dropdown selector.",
    },
    {
      question: "How is the Dashboard Conversion Rate calculated?",
      answer: "The conversion rate is calculated dynamically as the ratio of 'Won' leads to total leads in the database. Mathematically: (Won Leads / Total Leads) * 100.",
    },
    {
      question: "Is Startup CRM Lite accessible on mobile?",
      answer: "Absolutely! The CRM features a fully responsive sidebar navigation drawer that expands and collapses on smaller screen viewports, ensuring full layout accessibility.",
    },
  ];

  // State hook to track expanded FAQ item index
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Toggle FAQ item visibility
  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // State hooks for contact form
  const [formData, setFormData] = useState({
    category: "Technical Issue",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input changes handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Support form submission handler
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject.trim()) {
      toast.error("Please provide a subject line.");
      return;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      toast.error("Please enter a detailed message (minimum 10 characters).");
      return;
    }

    setIsSubmitting(true);

    // Simulate network submission request
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        category: "Technical Issue",
        subject: "",
        message: "",
      });
      toast.success("Support ticket submitted! We'll get back to you shortly.");
    }, 950);
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5 lg:space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Help & Support
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Find answers, review CRM documentation guides, or contact technical support.
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-3 lg:gap-6">
        {/* Left Columns: FAQs and Guides */}
        <div className="min-w-0 space-y-5 lg:col-span-2 lg:space-y-6">
          {/* FAQ Accordion Section */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-500" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-gray-100 dark:border-gray-700/70 rounded-xl overflow-hidden"
                  >
                    {/* Header trigger panel */}
                    <button
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isExpanded}
                      className="flex min-h-11 w-full items-center justify-between gap-3 bg-slate-50/50 p-4 text-left text-sm font-bold text-gray-800 transition-colors hover:bg-slate-100/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-gray-700/30 dark:text-gray-200 dark:hover:bg-gray-700/60"
                    >
                      <span className="min-w-0 break-words">{faq.question}</span>
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" />
                      )}
                    </button>

                    {/* Collapsible content pane */}
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isExpanded ? "max-h-40 border-t border-gray-100 dark:border-gray-700/70" : "max-h-0"
                      } overflow-hidden`}
                    >
                      <p className="p-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Guides Grid */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-md transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <span>Quick Start Guides</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="p-4 rounded-xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/20 text-xs">
                <span className="font-bold text-blue-700 dark:text-blue-400 block mb-1">
                  1. Managing CRM Leads
                </span>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Go to Leads page. Use the inline form to add prospective records. Select search query parameters to locate exact lead lists.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl bg-violet-50/40 dark:bg-violet-950/20 border border-violet-100/50 dark:border-violet-900/20 text-xs">
                <span className="font-bold text-violet-700 dark:text-violet-400 block mb-1">
                  2. Analyzing Metrics
                </span>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Go to Analytics page. Select calendar filters (Today, Weekly, Monthly) to aggregate performance timelines and view key insights.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Support Form */}
        <div className="min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-md transition-all duration-300 dark:border-gray-700/50 dark:bg-gray-800 sm:p-6 lg:col-span-1">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100 dark:border-gray-700/80">
            <Mail className="text-blue-600 dark:text-blue-400 w-5 h-5" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Contact Support
            </h2>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 [&_input]:min-h-11 [&_select]:min-h-11">
            {/* Category selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Inquiry Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-xs font-medium"
              >
                <option value="Technical Issue">Technical Issue</option>
                <option value="Billing Question">Billing Question</option>
                <option value="Feature Request">Feature Request</option>
                <option value="General Feedback">General Feedback</option>
              </select>
            </div>

            {/* Subject input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Brief summary"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-xs font-medium"
              />
            </div>

            {/* Message input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Detailed Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Describe your issue..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/30 transition-all text-xs font-medium resize-none"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer focus:outline-none disabled:opacity-75 focus:ring-2 focus:ring-blue-500/50 shadow-md transition-all duration-200"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Submit Ticket</span>
                </>
              )}
            </button>
          </form>

          {/* Quick contact detail cards footer */}
          <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700/80 flex items-center gap-3 text-xs text-gray-400">
            <PhoneCall className="w-4 h-4 text-blue-500 shrink-0" />
            <div>
              <span className="font-bold text-gray-600 dark:text-gray-300 block">
                Direct Helpdesk Call
              </span>
              <span>Mon-Fri, 9am - 5pm PST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
