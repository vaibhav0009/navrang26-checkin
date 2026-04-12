import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function StudentLogin() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    rollNo: "",
    dob: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const students = JSON.parse(localStorage.getItem("students")) || [];

    const matchedStudent = students.find(
      (student) =>
        student.rollNo === loginData.rollNo && student.dob === loginData.dob,
    );

    if (!matchedStudent) {
      toast.error("Invalid Credentials");
      return;
    }

    localStorage.setItem("loggedInStudent", JSON.stringify(matchedStudent));

    toast.success("Login Successful!");

    navigate("/user");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] flex items-center justify-center px-4">
      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md rounded-4xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(251,146,60,0.12)] p-8">
        <p className="text-center text-sm tracking-[0.3em] text-orange-200 mb-2">
          NAVRANG'26 ENTRY
        </p>

        <h1 className="text-4xl font-bold text-center bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
          Claim Your Pass
        </h1>

        <p className="text-center text-gray-300 mb-8 text-sm">
          Login using your roll number and date of birth to access your digital
          event pass
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="rollNo"
            placeholder="Roll Number"
            value={loginData.rollNo}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none placeholder:text-gray-400"
          />

          <input
            type="date"
            name="dob"
            value={loginData.dob}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Access My Pass
          </button>
        </form>

        
      </div>
    </div>
  );
}
