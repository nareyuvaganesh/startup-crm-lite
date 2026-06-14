import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="flex flex-col md:flex-row">
          <Sidebar />

          <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6 text-gray-900 dark:text-white">
            <AppRoutes />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;