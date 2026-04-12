import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-120 h-120 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      {/* Navbar */}
      <nav className="relative z-20 flex justify-between items-center px-6 md:px-12 py-6">
        <h2 className="text-2xl font-bold bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
          NAVRANG'26
        </h2>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1"
          >
            <span className="w-6 h-0.5 bg-white rounded"></span>
            <span className="w-6 h-0.5 bg-white rounded"></span>
            <span className="w-6 h-0.5 bg-white rounded"></span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-4 w-52 rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
              <button
                onClick={() => navigate("/admin-login")}
                className="w-full px-5 py-4 text-left hover:bg-white/10 transition"
              >
                Admin Control Panel
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <p className="text-sm tracking-[0.4em] text-orange-200 mb-4">
            IERT PRESENTS
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent mb-6">
            NAVRANG'26
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-gray-200 mb-4">
            Freshers Celebration Portal
          </p>

          <p className="text-gray-300 max-w-lg mb-8 leading-relaxed">
            Secure your digital entry pass for the most vibrant night of the
            year. Celebrate culture, talent, music and unforgettable memories.
          </p>

          <button
            onClick={() => navigate("/student-login")}
            className="px-8 py-4 rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Get Your Pass
          </button>
        </div>

        {/* Right Event Highlights */}
        <div className="rounded-4xl border border-white/10 bg-white/10 backdrop-blur-2xl p-8 shadow-[0_0_60px_rgba(251,146,60,0.15)]">
          <h3 className="text-2xl font-bold text-orange-300 mb-6">
            Event Highlights
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <HighlightCard title="Date" value="03 April 2026" />
            <HighlightCard title="Venue" value="IERT Auditorium" />
            <HighlightCard title="Time" value="10:00 AM Onwards" />
            <HighlightCard title="Entry" value="QR Verified Pass" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <p className="relative z-10 text-center text-xs text-gray-400 pb-6">
        Powered by IERT Event Management System
      </p>
    </div>
  );
}

function HighlightCard({ title, value }) {
  return (
    <div className="rounded-3xl bg-black/20 border border-white/10 p-5">
      <p className="text-sm text-orange-200 mb-1">{title}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  );
}
