import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();

  const students = JSON.parse(localStorage.getItem("students")) || [];

  const student = students.find((s) => s.rollNo === id);

  if (!student) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0B1026] via-[#1A103D] to-[#2E1065] flex items-center justify-center">
        <h1 className="text-white text-2xl">Student Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1026] via-[#1A103D] to-[#2E1065] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-yellow-400">
            Navrang'26 Entry Pass
          </h1>
          <p className="text-purple-200 mt-2">
            Verified Fresher Party Attendee Profile
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Profile Card */}
          <div className="bg-white/10 backdrop-blur-xl border border-purple-400/20 rounded-3xl p-6 flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 flex items-center justify-center text-4xl font-bold text-white mb-4">
              {student.name.charAt(0).toUpperCase()}
            </div>

            <h2 className="text-2xl font-bold text-white">{student.name}</h2>

            <p className="text-purple-200 mt-1">Fresher Attendee</p>

            <div className="mt-6 w-full">
              <div className="bg-green-500/20 border border-green-400 text-green-300 rounded-xl px-4 py-2 text-center">
                Entry Approved
              </div>
            </div>
          </div>

          {/* Right Details Card */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-xl border border-purple-400/20 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-6">
              Student Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6 text-white">
              <div>
                <p className="text-purple-200 text-sm">Full Name</p>
                <p className="text-lg font-medium">{student.name}</p>
              </div>

              <div>
                <p className="text-purple-200 text-sm">Roll Number</p>
                <p className="text-lg font-medium">{student.rollNo}</p>
              </div>

              <div>
                <p className="text-purple-200 text-sm">Date of Birth</p>
                <p className="text-lg font-medium">{student.dob}</p>
              </div>

              <div>
                <p className="text-purple-200 text-sm">Event</p>
                <p className="text-lg font-medium">Navrang'26</p>
              </div>

              <div>
                <p className="text-purple-200 text-sm">Entry Status</p>
                <p className="text-lg font-medium text-green-400">Approved</p>
              </div>

              <div>
                <p className="text-purple-200 text-sm">Pass Type</p>
                <p className="text-lg font-medium">Fresher Access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
