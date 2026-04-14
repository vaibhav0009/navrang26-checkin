import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleProtectedNavigation = async (targetRole) => {
    const user = auth.currentUser;

    if (!user) {
      navigate(targetRole === "admin" ? "/admin-login" : "/entry-login");
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        navigate("/");
        return;
      }

      const role = userDoc.data().role;

      if (role !== targetRole) {
        navigate(targetRole === "admin" ? "/admin-login" : "/entry-login");
        return;
      }

      navigate(targetRole === "admin" ? "/admin" : "/entry-dashboard");
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] text-white flex flex-col">
      {/* Animated Background Glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute top-1/2 left-1/2 w-120 h-120 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
      />

      {/* Navbar */}
      <nav className="relative z-20 flex justify-between items-center px-6 md:px-12 py-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent"
        >
          NAVRANG'26
        </motion.h2>

        <div className="relative">
          {menuOpen && (
            <div
              className="fixed inset-0 z-10"
              onClick={() => setMenuOpen(false)}
            />
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-20 flex flex-col gap-1"
          >
            <span className="w-6 h-0.5 bg-white rounded"></span>
            <span className="w-6 h-0.5 bg-white rounded"></span>
            <span className="w-6 h-0.5 bg-white rounded"></span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-4 w-56 rounded-3xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden z-20">
              <button
                onClick={() => handleProtectedNavigation("admin")}
                className="w-full px-5 py-4 text-left hover:bg-white/10 transition"
              >
                Admin Control Panel
              </button>

              <button
                onClick={() => handleProtectedNavigation("entryStaff")}
                className="w-full px-5 py-4 text-left hover:bg-white/10 transition border-t border-white/10"
              >
                Entry Staff Login
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex-1 max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
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
            Secure your digital pass for a day of celebration, culture, music
            and unforgettable memories.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/student-login")}
            className="px-8 py-4 rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg"
          >
            Get Your Pass
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-4xl border border-white/10 bg-white/10 backdrop-blur-2xl p-8 shadow-[0_0_60px_rgba(251,146,60,0.15)]"
        >
          <h3 className="text-2xl font-bold text-orange-300 mb-6">
            Event Highlights
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <HighlightCard title="Date" value="03 April 2026" />
            <HighlightCard title="Venue" value="IERT Auditorium" />
            <HighlightCard title="Time" value="10:00 AM Onwards" />
            <HighlightCard title="Entry" value="QR Verified Pass" />
          </div>
        </motion.div>
      </section>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 text-center text-xs text-gray-400 pb-6"
      >
        Powered by IERT Event Management System
      </motion.p>
    </div>
  );
}

function HighlightCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl bg-black/20 border border-white/10 p-5"
    >
      <p className="text-sm text-orange-200 mb-1">{title}</p>
      <p className="text-white font-semibold">{value}</p>
    </motion.div>
  );
}
