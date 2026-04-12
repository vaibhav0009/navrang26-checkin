import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  const auth = getAuth();

  const handleChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        adminData.email,
        adminData.password,
      );

      toast.success("Admin Login Successful!");

      navigate("/admin");
    } catch (error) {
      console.error(error);
      toast.error("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] flex items-center justify-center px-4">
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md rounded-4xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(251,146,60,0.12)] p-8">
        <p className="text-center text-sm tracking-[0.3em] text-orange-200 mb-2">
          NAVRANG'26
        </p>

        <h1 className="text-4xl font-bold text-center bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
          Admin Portal
        </h1>

        <p className="text-center text-gray-300 mb-8 text-sm">
          Manage registrations, attendees, and entry verification
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={adminData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={adminData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
