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

    const students =
      JSON.parse(localStorage.getItem("students")) || [];

    const matchedStudent = students.find(
      (student) =>
        student.rollNo === loginData.rollNo &&
        student.dob === loginData.dob
    );

    if (!matchedStudent) {
      toast.error("Invalid Credentials");
      return;
    }

    localStorage.setItem(
      "loggedInStudent",
      JSON.stringify(matchedStudent)
    );

    toast.success("Login Successful!");

    navigate("/user");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1026] via-[#1A103D] to-[#2E1065] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-400/20">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
          Student Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            name="rollNo"
            placeholder="Roll Number"
            value={loginData.rollNo}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 text-white border border-purple-300/20 outline-none"
          />

          <input
            type="date"
            name="dob"
            value={loginData.dob}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 text-white border border-purple-300/20 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 text-white font-semibold"
          >
            Get My Pass
          </button>
        </form>
      </div>
    </div>
  );
}