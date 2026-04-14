import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/admin-login");
        return;
      }

      fetchStudents();
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const fetchStudents = async () => {
    const snapshot = await getDocs(collection(db, "students"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setStudents(data);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const checkedIn = students.filter((s) => s.isCheckedIn).length;
  const pending = students.length - checkedIn;
  const percentage =
    students.length > 0 ? Math.round((checkedIn / students.length) * 100) : 0;

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] px-6 py-8">
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
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
              Monitor registrations, approvals and live event entry.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="overflow-x-auto pb-2 mb-8">
          <div className="flex md:grid md:grid-cols-3 gap-4 min-w-max md:min-w-0">
            <StatCard label="Total Students" value={students.length} />
            <StatCard label="Checked In" value={checkedIn} />
            <StatCard label="Pending" value={pending} />
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
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
            className="rounded-3xl bg-white/10 border border-white/10 p-8 text-left shadow-xl hover:scale-[1.02] transition"
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

        {/* Recent Check-Ins */}
        <div className="rounded-4xl bg-white/10 border border-white/10 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Recent Check-Ins
          </h2>

          {students.filter((s) => s.isCheckedIn).length === 0 ? (
            <p className="text-gray-400">No entries yet.</p>
          ) : (
            <div className="space-y-4">
              {students
                .filter((s) => s.isCheckedIn)
                .sort((a, b) => b.checkedInAt?.seconds - a.checkedInAt?.seconds)
                .slice(0, 5)
                .map((student) => (
                  <div
                    key={student.id}
                    className="rounded-2xl bg-white/5 border border-white/10 p-4"
                  >
                    <p className="text-white font-semibold">{student.name}</p>

                    <p className="text-gray-400 text-sm">{student.rollNo}</p>

                    <p className="text-orange-200 text-sm mt-1">
                      {student.checkedInAt?.toDate
                        ? student.checkedInAt.toDate().toLocaleString()
                        : ""}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="min-w-40 md:min-w-0 rounded-3xl bg-white/10 border border-white/10 p-4 md:p-6 text-center backdrop-blur-xl shadow-[0_0_30px_rgba(251,146,60,0.08)]">
      <p className="text-xs md:text-sm tracking-[0.15em] text-orange-200 mb-2 uppercase">
        {label}
      </p>

      <p className="text-2xl md:text-4xl font-bold bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
        {value}
      </p>
    </div>
  );
}