import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      adminData.email === "admin@navrang.com" &&
      adminData.password === "admin123"
    ) {
      localStorage.setItem("adminLoggedIn", "true");

      toast.success("Admin Login Successful!");

      navigate("/admin");
    } else {
      toast.error("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1026] via-[#1A103D] to-[#2E1065] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-400/20">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={adminData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 text-white border border-purple-300/20 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={adminData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 text-white border border-purple-300/20 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 text-white font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
