import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

import { Route, Routes } from "react-router-dom";
import EmployeeManager from "./pages/EmployeeManager";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
        <Routes> <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/chat" element={<ChatPage/>} />
        <Route path="employee" element={<EmployeeManager/>}/></Routes>

    </div>
  );
}
