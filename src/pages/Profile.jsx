import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();

  const students = JSON.parse(localStorage.getItem("students")) || [];

  const student = students.find((s) => s.rollNo === id);

  if (!student) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] flex items-center justify-center px-4">
        <div className="rounded-4xl bg-white/10 backdrop-blur-2xl border border-white/10 p-10 text-center">
          <h1 className="text-3xl font-bold text-red-400 mb-2">
            Student Not Found
          </h1>
          <p className="text-gray-300">
            This QR code is invalid or the attendee does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] px-4 py-8">
      {/* Glow Background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-orange-200 tracking-[0.3em] text-sm mb-2">
            QR VERIFICATION
          </p>

          <h1 className="text-4xl font-bold bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
            Verified Entry Profile
          </h1>

          <p className="text-gray-300 mt-2">
            Official Navrang'26 attendee verification portal
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Profile Card */}
          <div className="rounded-4xl bg-white/10 backdrop-blur-2xl border border-white/10 p-8 text-center shadow-[0_0_50px_rgba(251,146,60,0.12)]">
            <div className="w-28 h-28 mx-auto rounded-full bg-linear-to-r from-orange-500 to-red-500 flex items-center justify-center text-4xl font-bold text-white mb-5">
              {student.name.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-2xl font-bold text-white">{student.name}</h2>

            <p className="text-gray-300 mt-1">Fresher Attendee</p>

            <div className="mt-6 rounded-xl bg-green-500/20 border border-green-400 text-green-300 px-4 py-3">
              Entry Approved
            </div>
          </div>

          {/* Right Details */}
          <div className="lg:col-span-2 rounded-4xl bg-white/10 backdrop-blur-2xl border border-white/10 p-8 shadow-[0_0_50px_rgba(251,146,60,0.12)]">
            <h3 className="text-2xl font-semibold text-orange-300 mb-6">
              Attendee Information
            </h3>

            <div className="grid md:grid-cols-2 gap-5">
              <InfoCard label="Full Name" value={student.name} />
              <InfoCard label="Roll Number" value={student.rollNo} />
              <InfoCard label="Date of Birth" value={student.dob} />
              <InfoCard label="Event" value="Navrang'26" />
              <InfoCard label="Pass Type" value="Fresher Access" />
              <InfoCard label="Venue" value="IERT Auditorium" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <p className="text-sm text-orange-200 mb-1">{label}</p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  );
}
