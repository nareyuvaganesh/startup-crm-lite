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
    <div className="relative flex flex-col items-center justify-center min-h-[75vh] p-6 text-center select-none overflow-hidden">
      
      {/* Decorative blurred background circle to give a glowing background accent bubble effect */}
      <div className="absolute w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      
      {/* Floating help icon container to draw user's visual attention */}
      <div className="relative mb-6">
        {/* Soft red background with bounce animation displaying the help query mark icon */}
        <div className="bg-red-50 dark:bg-red-950/30 p-5 rounded-full text-red-500 animate-bounce duration-1000">
          <HelpCircle size={48} />
        </div>
      </div>

      {/* Heavy weight numeric text displaying 404 error code in dual-color gradient */}
      <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 tracking-wider mb-2">
        404
      </h1>

      {/* Prominent main title informing user the target page is not found */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
        Page Not Found
      </h2>

      {/* Informative text body helping explain the possible causes for routing failure */}
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
        We can't seem to find the page you're looking for. The URL might be misspelled, or the page has been moved.
      </p>

      {/* Routing redirection button to allow quick return home */}
      <div>
        <Link
          to="/" // Destination route target pointing to dashboard index.
          // CSS classes styling: hover gradients, cursor pointers, shadows, transform animations.
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
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