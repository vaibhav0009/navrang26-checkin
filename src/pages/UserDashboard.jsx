import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function UserDashboard() {
  const navigate = useNavigate();
  const qrRef = useRef(null);

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const loggedInStudent = JSON.parse(
        localStorage.getItem("loggedInStudent"),
      );

      if (!loggedInStudent) {
        navigate("/");
        return;
      }

      try {
        const studentRef = doc(db, "students", loggedInStudent.id);

        const studentSnap = await getDoc(studentRef);

        if (!studentSnap.exists()) {
          toast.error("Student not found.");
          navigate("/");
          return;
        }

        setStudent({
          id: studentSnap.id,
          ...studentSnap.data(),
        });
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile.");
      }
    };

    fetchStudent();
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
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] px-4 py-8">
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <p className="text-orange-200 tracking-[0.3em] text-sm mb-2">
              NAVRANG'26 PASS
            </p>

            <h1 className="text-4xl font-bold bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Digital Entry Pass
            </h1>

            <p className="text-gray-300 mt-2">
              Your verified access credential for the event
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium shadow-lg"
          >
            Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
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

          <div className="lg:col-span-2 rounded-4xl bg-white/10 backdrop-blur-2xl border border-white/10 p-8 shadow-[0_0_50px_rgba(251,146,60,0.12)]">
            <h3 className="text-2xl font-semibold text-orange-300 mb-6">
              Pass Details
            </h3>

            <div className="grid md:grid-cols-2 gap-5 text-white mb-8">
              <InfoCard label="Full Name" value={student.name} />
              <InfoCard label="Roll Number" value={student.rollNo} />
              <InfoCard label="Date of Birth" value={student.dob} />
              <InfoCard label="Event" value="Navrang'26" />
              <InfoCard label="Venue" value="IERT Auditorium" />
              <InfoCard label="Pass Type" value="Fresher Access" />
            </div>

            <button
              onClick={downloadQR}
              className="w-full py-3 rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
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

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
      <p className="text-sm text-orange-200 mb-1">{label}</p>
      <p className="font-semibold text-white">{value}</p>
    </div>
  );
}
