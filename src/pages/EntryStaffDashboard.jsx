import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EntryStaffDashboard() {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/entry-login");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] px-4">
      <div className="max-w-xl w-full rounded-4xl bg-white/10 backdrop-blur-2xl border border-white/10 p-10 text-center">
        <p className="text-orange-200 tracking-[0.3em] text-sm mb-3">
          ENTRY STAFF PORTAL
        </p>

        <h1 className="text-4xl font-bold text-white mb-4">
          Ready For Entry Verification
        </h1>

        <p className="text-gray-300 mb-8">
          You are now authorized to scan and approve attendee entries.
        </p>

        <button
          onClick={handleLogout}
          className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
