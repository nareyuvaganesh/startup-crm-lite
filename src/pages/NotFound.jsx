// Import Link component from react-router-dom to facilitate client-side navigation.
import { Link } from "react-router-dom";
// Import Lucide icons to display a status representation and direct back navigation.
import { ArrowLeft, HelpCircle } from "lucide-react";

/**
 * NotFound component
 * Renders a visually premium, user-friendly 404 page for unmatched URL paths.
 */
export default function NotFound() {
  return (
    // Flexbox container that centers the contents and fills the container min-height.
    <div className="relative flex min-h-[70vh] max-w-full select-none flex-col items-center justify-center overflow-hidden p-4 text-center sm:p-6">
      
      {/* Decorative blurred background circle to give a glowing background accent bubble effect */}
      <div className="absolute -z-10 size-56 max-w-full animate-pulse rounded-full bg-blue-500/10 blur-3xl sm:size-72"></div>
      
      {/* Floating help icon container to draw user's visual attention */}
      <div className="relative mb-6">
        {/* Soft red background with bounce animation displaying the help query mark icon */}
        <div className="bg-red-50 dark:bg-red-950/30 p-5 rounded-full text-red-500 animate-bounce duration-1000">
          <HelpCircle size={48} />
        </div>
      </div>

      {/* Heavy weight numeric text displaying 404 error code in dual-color gradient */}
      <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-6xl font-black tracking-wider text-transparent dark:from-blue-400 dark:to-indigo-400 sm:text-8xl">
        404
      </h1>

      {/* Prominent main title informing user the target page is not found */}
      <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
        Page Not Found
      </h2>

      {/* Informative text body helping explain the possible causes for routing failure */}
      <p className="mb-8 max-w-md break-words text-sm text-gray-500 dark:text-gray-400 sm:text-base">
        We can't seem to find the page you're looking for. The URL might be misspelled, or the page has been moved.
      </p>

      {/* Routing redirection button to allow quick return home */}
      <div>
        <Link
          to="/" // Destination route target pointing to dashboard index.
          // CSS classes styling: hover gradients, cursor pointers, shadows, transform animations.
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-indigo-500/25"
        >
          {/* Lucide arrow icon pointing to the left */}
          <ArrowLeft size={18} />
          {/* Label indicating user action destination */}
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
