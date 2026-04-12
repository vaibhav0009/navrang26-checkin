import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] flex items-center justify-center px-4">
      {/* Warm Glow Background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 w-120 h-120 bg-yellow-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-lg rounded-4xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_0_60px_rgba(251,146,60,0.15)] p-10">
        <p className="text-center text-sm tracking-[0.4em] text-orange-200 mb-2">
          IERT PRESENTS
        </p>

        <h1 className="text-5xl md:text-6xl font-extrabold text-center bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent mb-3">
          NAVRANG'26
        </h1>

        <p className="text-center text-lg text-gray-200 font-medium mb-1">
          Freshers Celebration Portal
        </p>

        <p className="text-center text-orange-100 mb-8 text-sm md:text-base">
          Secure your digital entry pass for the most vibrant night of the year
          ✨
        </p>

        {/* Event Info */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="rounded-2xl bg-white/5 p-3 text-center border border-white/10">
            <p className="text-xs text-orange-200">Date</p>
            <p className="text-sm font-semibold text-white">03 Apr</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-3 text-center border border-white/10">
            <p className="text-xs text-orange-200">Venue</p>
            <p className="text-sm font-semibold text-white">Auditorium</p>
          </div>

          <div className="rounded-2xl bg-white/5 p-3 text-center border border-white/10">
            <p className="text-xs text-orange-200">Access</p>
            <p className="text-sm font-semibold text-white">QR Pass</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => navigate("/student-login")}
            className="w-full py-3 rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Claim Your Entry Pass
          </button>

          <button
            onClick={() => navigate("/admin-login")}
            className="w-full py-3 rounded-full bg-black/70 border border-white/10 text-white font-semibold hover:bg-black transition"
          >
            Admin Control Panel
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Powered by IERT Event Management System
        </p>
      </div>
    </div>
  );
}
