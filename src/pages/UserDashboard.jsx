import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UserDashboard() {
  const navigate = useNavigate();
  const qrRef = useRef(null);

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loggedInStudent = JSON.parse(localStorage.getItem("loggedInStudent"));

    if (!loggedInStudent) {
      navigate("/");
      return;
    }

    setStudent(loggedInStudent);
  }, [navigate]);

  if (!student) return null;

  const profileURL = `${window.location.origin}/profile/${student.rollNo}`;

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");

    if (!canvas) {
      toast.error("QR not found.");
      return;
    }

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${student.rollNo}-qr.png`;
    downloadLink.click();

    toast.success("QR Downloaded Successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInStudent");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1026] via-[#1A103D] to-[#2E1065] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400">
              Navrang'26 Digital Pass
            </h1>
            <p className="text-purple-200 mt-2">
              Verified Fresher Party Entry Profile
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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

          <div className="md:col-span-2 bg-white/10 backdrop-blur-xl border border-purple-400/20 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-6">
              Pass Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6 text-white mb-8">
              <div>
                <p className="text-purple-200 text-sm">Full Name</p>
                <p>{student.name}</p>
              </div>

              <div>
                <p className="text-purple-200 text-sm">Roll Number</p>
                <p>{student.rollNo}</p>
              </div>

              <div>
                <p className="text-purple-200 text-sm">Date of Birth</p>
                <p>{student.dob}</p>
              </div>

              <div>
                <p className="text-purple-200 text-sm">Event</p>
                <p>Navrang'26</p>
              </div>

              <div>
                <p className="text-purple-200 text-sm">Venue</p>
                <p>IERT Auditorium</p>
              </div>

              <div>
                <p className="text-purple-200 text-sm">Pass Type</p>
                <p>Fresher Access</p>
              </div>
            </div>

            <button
              onClick={downloadQR}
              className="w-full py-3 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 text-white font-semibold"
            >
              Download QR Pass
            </button>
          </div>
        </div>

        <div ref={qrRef} className="hidden">
          <QRCodeCanvas value={profileURL} size={300} />
        </div>
      </div>
    </div>
  );
}
