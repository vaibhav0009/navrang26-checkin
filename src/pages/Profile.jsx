import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { db } from "../firebase";

import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const { id } = useParams();

  const auth = getAuth();

  const [student, setStudent] = useState(null);
  const [studentDocId, setStudentDocId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGatekeeper, setIsGatekeeper] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsGatekeeper(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const q = query(
          collection(db, "students"),
          where("passToken", "==", id),
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];

          setStudent(docSnap.data());
          setStudentDocId(docSnap.id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleMarkEntered = async () => {
    try {
      await updateDoc(doc(db, "students", studentDocId), {
        isCheckedIn: true,
        checkedInAt: Timestamp.now(),
      });

      setStudent((prev) => ({
        ...prev,
        isCheckedIn: true,
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to mark entry.");
    }
  };

  if (loading) return null;

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Student Not Found
      </div>
    );
  }

  const isUsed = student.isCheckedIn === true;

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] px-4 py-8">
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="rounded-4xl bg-white/10 backdrop-blur-2xl border border-white/10 p-8 text-center">
            <h2 className="text-2xl font-bold text-white">{student.name}</h2>

            <div
              className={`mt-6 rounded-xl px-4 py-3 border ${
                isUsed
                  ? "bg-red-500/20 border-red-400 text-red-300"
                  : "bg-green-500/20 border-green-400 text-green-300"
              }`}
            >
              {isUsed ? "Already Entered" : "Entry Available"}
            </div>

            {isGatekeeper && !isUsed && (
              <button
                onClick={handleMarkEntered}
                className="mt-6 w-full py-3 rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold"
              >
                Mark As Entered
              </button>
            )}
          </div>

          <div className="lg:col-span-2 rounded-4xl bg-white/10 backdrop-blur-2xl border border-white/10 p-8">
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
