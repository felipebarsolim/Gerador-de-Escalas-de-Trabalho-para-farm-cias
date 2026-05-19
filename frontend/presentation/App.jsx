import { createRoot } from "react-dom/client";
import { Dashboard } from "./screens/Dashboard";
import "./App.css";
import { Layout } from "./components/Layout";
import { EmployeesScreen } from "./screens/EmployeeScreen";
import { useState } from "react";
import { Sidebar } from "./screens/SideBar";

function App() {
    const [currentTab, setCurrentTab] = useState("dashboard");
    return (
        <div className="flex w-full min-h-screen">
            <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
            <div className="flex-1">
                {currentTab === "dashboard" && <Dashboard />}
                {currentTab === "employees" && <EmployeesScreen />}
                {currentTab === "settings" && (
                    <div className="min-h-screen bg-gray-50 p-12">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Configurações
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Área de ajustes do sistema (Em desenvolvimento).
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(<App />);
}

export default App;
