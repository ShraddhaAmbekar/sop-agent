import { useEffect, useState } from "react";
import PdfManager from "./PdfManager";
import EmployeeManager from "./EmployeeManager";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [pdfs, setPdfs] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedPdfs = JSON.parse(localStorage.getItem("pdfs") || "[]");
    const storedEmployees = JSON.parse(localStorage.getItem("employees") || "[]");
    setPdfs(storedPdfs);
    setEmployees(storedEmployees);
  }, []);

  return (
    <div className="min-h-screen flex bg-[#EEF2F7]">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#0B1B2B] text-white p-6">
        <h2 className="text-2xl font-bold mb-6">OpsMind Admin</h2>

        <div className="space-y-3">
          <button
            className={`w-full text-left p-3 rounded-lg transition ${
              activeTab === "dashboard"
                ? "bg-[#2E7DF5]"
                : "bg-[#0B1B2B] hover:bg-[#1B2E4A]"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={`w-full text-left p-3 rounded-lg transition ${
              activeTab === "pdf"
                ? "bg-[#2E7DF5]"
                : "bg-[#0B1B2B] hover:bg-[#1B2E4A]"
            }`}
            onClick={() => setActiveTab("pdf")}
          >
            PDF Manager
          </button>

          <button
            className={`w-full text-left p-3 rounded-lg transition ${
              activeTab === "employee"
                ? "bg-[#2E7DF5]"
                : "bg-[#0B1B2B] hover:bg-[#1B2E4A]"
            }`}
            onClick={() => setActiveTab("employee")}
          >
            Employee Manager
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#0B1B2B]">
            Admin Dashboard
          </h1>
          <span className="text-sm text-[#5B6B7A]">
            Welcome, Admin
          </span>
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-5 rounded-2xl shadow border border-[#E3E8F1]">
                <h2 className="font-bold text-[#0B1B2B]">Total PDFs</h2>
                <p className="text-3xl font-semibold text-[#2E7DF5]">
                  {pdfs.length}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow border border-[#E3E8F1]">
                <h2 className="font-bold text-[#0B1B2B]">Total Employees</h2>
                <p className="text-3xl font-semibold text-[#2E7DF5]">
                  {employees.length}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow border border-[#E3E8F1]">
                <h2 className="font-bold mb-3 text-[#0B1B2B]">PDF List</h2>
                <PdfManager readOnly={true} />
              </div>

              <div className="bg-white p-5 rounded-2xl shadow border border-[#E3E8F1]">
                <h2 className="font-bold mb-3 text-[#0B1B2B]">
                  Employee List
                </h2>
                <EmployeeManager readOnly={true} />
              </div>
            </div>
          </div>
        )}

        {/* PDF Manager */}
        {activeTab === "pdf" && (
          <div className="bg-white p-6 rounded-2xl shadow border border-[#E3E8F1]">
            <PdfManager />
          </div>
        )}

        {/* Employee Manager */}
        {activeTab === "employee" && (
          <div className="bg-white p-6 rounded-2xl shadow border border-[#E3E8F1]">
            <EmployeeManager />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
