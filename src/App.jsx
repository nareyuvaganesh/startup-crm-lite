// Import BrowserRouter from react-router-dom to handle HTML5 History API based navigation.
import { BrowserRouter } from "react-router-dom";
// Import the navigation Sidebar component that allows users to switch between routes.
import Sidebar from "./components/common/Sidebar";
import Navbar from "./components/common/Navbar";
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
      <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-white">
        {/* Layout container that organizes items as column on mobile and row on larger screens */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar component rendering desktop navigation panel and mobile bottom navigation tab bar */}
          <Sidebar />

          <div className="min-w-0 flex-1">
            <Navbar />

            <main className="p-4 pb-24 text-gray-900 transition-colors duration-200 dark:text-white md:p-5 lg:p-6">
              <AppRoutes />
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

// Export the App component as default for entry point mounting.
export default App;
