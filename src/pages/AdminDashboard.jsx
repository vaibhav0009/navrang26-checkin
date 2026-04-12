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
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] px-6 py-8">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <p className="text-orange-200 tracking-[0.3em] text-sm mb-2">
              NAVRANG'26 ADMIN
            </p>

            <h1 className="text-4xl font-bold bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Control Dashboard
            </h1>

            <p className="text-gray-300 mt-2">
              Manage attendees, registrations and event access
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium shadow-lg transition"
          >
            Logout
          </button>
        </div>

        {/* Stats / Info Cards */}
        

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate("/admin/add-student")}
            className="rounded-3xl bg-linear-to-r from-orange-500 to-red-500 p-8 text-left shadow-xl hover:scale-[1.02] transition"
          >
            <p className="text-sm text-orange-100 mb-2">REGISTRATION</p>

            <h2 className="text-2xl font-bold text-white mb-2">
              Add New Student
            </h2>

            <p className="text-orange-100">
              Register freshers and grant event entry eligibility.
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/students")}
            className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-8 text-left shadow-xl hover:scale-[1.02] transition"
          >
            <p className="text-sm text-orange-200 mb-2">DATABASE</p>

            <h2 className="text-2xl font-bold text-white mb-2">
              View All Students
            </h2>

            <p className="text-gray-300">
              Search, monitor and manage registered attendees.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
