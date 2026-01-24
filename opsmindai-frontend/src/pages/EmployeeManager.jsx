import { useEffect, useState } from "react";

const EmployeeManager = ({ readOnly }) => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployees(stored);
  }, []);

  const handleAdd = () => {
    if (!name || !email) return;

    const newEmp = {
      id: Date.now(),
      name,
      email,
    };

    const updated = [...employees, newEmp];
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));

    setName("");
    setEmail("");
  };

  const handleDelete = (id) => {
    const updated = employees.filter((e) => e.id !== id);
    setEmployees(updated);
    localStorage.setItem("employees", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] p-4 md:p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow border border-[#E3E8F1] p-5">

       

        {/* Add Employee */}
        {!readOnly && (
          <div className="flex flex-col md:flex-row gap-3 mb-5">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Employee Name"
              className="flex-1 border border-[#E3E8F1] p-3 rounded-lg focus:outline-none focus:border-[#2E7DF5]"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Employee Email"
              className="flex-1 border border-[#E3E8F1] p-3 rounded-lg focus:outline-none focus:border-[#2E7DF5]"
            />
            <button
              onClick={handleAdd}
              className="bg-[#2E7DF5] text-white px-6 py-3 rounded-lg hover:bg-[#7AB8FF] transition"
            >
              Add Employee
            </button>
          </div>
        )}

        {/* Employee List */}
        <div className="space-y-3">
          {employees.length === 0 && (
            <p className="text-[#5B6B7A]">No employees added yet.</p>
          )}

          {employees.map((e) => (
            <div
              key={e.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center border border-[#E3E8F1] p-4 rounded-lg"
            >
              <div>
                <div className="font-bold text-[#0B1B2B]">{e.name}</div>
                <div className="text-sm text-[#5B6B7A]">{e.email}</div>
              </div>

              {!readOnly && (
                <button
                  onClick={() => handleDelete(e.id)}
                  className="mt-3 md:mt-0 bg-[#E74C3C] text-white px-4 py-2 rounded-lg hover:bg-[#C0392B] transition"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManager;
