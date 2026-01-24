import { useState } from "react";
import { useNavigate } from "react-router-dom";

// static user data//
const users = [
  { email: "admin@gmail.com", password: "admin", role: "admin" },
  { email: "employee@gmail.com", password: "employee", role: "employee" },
];
//static user data//

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setLoading(true);
    setError("");

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    // Save role & token (mock token)
    localStorage.setItem("role", user.role);
    localStorage.setItem("token", "mock-token");

    // Navigate based on role
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/chat");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF2F7]">
      <div className="w-[420px] p-8 rounded-2xl shadow-lg border border-[#E3E8F1] bg-white">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-[#0B1B2B]">
            OpsMind AI
          </h2>
          <p className="text-sm text-[#5B6B7A] mt-1">
            Enterprise SOP Agent Login
          </p>
        </div>

        {error && (
          <p className="text-sm text-[#E74C3C] bg-[#FFE5E5] p-3 rounded-md mb-4">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-[#E3E8F1] p-3 rounded-lg mb-4 focus:outline-none focus:border-[#2E7DF5] shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-[#E3E8F1] p-3 rounded-lg mb-5 focus:outline-none focus:border-[#2E7DF5] shadow-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#2E7DF5] text-white py-3 rounded-lg font-medium hover:bg-[#7AB8FF] transition duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs text-[#5B6B7A] mt-4 text-center">
          Demo Credentials: admin@gmail.com / admin
        </p>
      </div>
    </div>
  );
};

export default Login;
