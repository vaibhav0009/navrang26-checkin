import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1026] via-[#1A103D] to-[#2E1065] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-purple-400/20 bg-white/10 backdrop-blur-xl shadow-2xl p-8">
        <h2 className="text-center text-sm tracking-[0.3em] text-purple-200 mb-2">
          IERT'S
        </h2>

        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-3">
          NAVRANG'26
        </h1>

        <p className="text-center text-purple-100 mb-8">
          Colors of Culture, Shades of Talent
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/student-login")}
            className="w-full py-3 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Get Your Pass
          </button>

          <button
            onClick={() => navigate("/admin-login")}
            className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition"
          >
            Explore Admin
          </button>
        </div>
      </div>
    </div>
  );
}
