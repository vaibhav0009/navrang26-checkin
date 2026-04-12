import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (!isAdminLoggedIn) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1026] via-[#1A103D] to-[#2E1065] px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400">
              Admin Dashboard
            </h1>
            <p className="text-purple-200 mt-1">
              Manage Student Check-In System
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium shadow-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate("/admin/add-student")}
            className="bg-linear-to-r from-purple-500 to-fuchsia-500 p-8 rounded-3xl text-left shadow-xl hover:scale-[1.02] transition"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              Add New Student
            </h2>
            <p className="text-purple-100">
              Register students for fresher entry and generate access
              eligibility.
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/students")}
            className="bg-white/10 backdrop-blur-xl border border-purple-400/20 p-8 rounded-3xl text-left shadow-xl hover:scale-[1.02] transition"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              See All Students
            </h2>
            <p className="text-purple-200">
              View, manage, edit and monitor registered student entries.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
