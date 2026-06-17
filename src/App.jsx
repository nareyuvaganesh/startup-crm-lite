// Import BrowserRouter from react-router-dom to handle HTML5 History API based navigation.
import { BrowserRouter } from "react-router-dom";
// Import the navigation Sidebar component that allows users to switch between routes.
import Sidebar from "./components/common/Sidebar";
// Import the routes configuration component containing the path switcher.
import AppRoutes from "./routes";

/**
 * App component
 * The root component of the app that wraps the entire dashboard UI with routing capability.
 */
function App() {
  return (
    // Wrap the app in BrowserRouter to enable routing hooks and components down the tree.
    <BrowserRouter>
      {/* Container wrapper that fills the viewport height and matches current theme backgrounds */}
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-200">
        {/* Layout container that organizes items as column on mobile and row on larger screens */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar component rendering desktop navigation panel and mobile bottom navigation tab bar */}
          <Sidebar />

          {/* Main content viewport where dynamic page views are swapped by the router switch */}
          {/* pt-20 padding top on mobile prevents the top fixed header bar from covering page content */}
          <main className="flex-1 p-4 pt-20 md:p-6 pb-6 text-gray-900 dark:text-white">
            {/* The routes list that matches current URL paths and dynamically renders lazy-loaded pages */}
            <AppRoutes />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

// Export the App component as default for entry point mounting.
export default App;