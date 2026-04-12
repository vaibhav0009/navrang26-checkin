import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export default function AddStudent() {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    rollNo: "",
    dob: "",
  });

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (!isAdminLoggedIn) {
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setStudent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student.name || !student.rollNo || !student.dob) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      const studentsRef = collection(db, "students");

      const duplicateQuery = query(
        studentsRef,
        where("rollNo", "==", student.rollNo),
      );

      const duplicateSnapshot = await getDocs(duplicateQuery);

      if (!duplicateSnapshot.empty) {
        toast.error("Student with this Roll Number already exists.");
        return;
      }

      await addDoc(studentsRef, student);

      toast.success("Student Added Successfully!");

      setStudent({
        name: "",
        rollNo: "",
        dob: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add student.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] flex items-center justify-center px-4 py-8">
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-4xl rounded-4xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(251,146,60,0.12)] p-8">
        <p className="text-sm tracking-[0.3em] text-orange-200 mb-2">
          REGISTRATION PANEL
        </p>

        <h1 className="text-4xl font-bold bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
          Add New Student
        </h1>

        <p className="text-gray-300 mb-8">
          Register a fresher and grant digital event access credentials
        </p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-orange-200 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              placeholder="Enter student name"
              className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-orange-200 mb-2">
              Roll Number
            </label>
            <input
              type="text"
              name="rollNo"
              value={student.rollNo}
              onChange={handleChange}
              placeholder="Enter roll number"
              className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-orange-200 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={student.dob}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none"
            />
          </div>

          <button
            type="submit"
            className="md:col-span-2 py-3 rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
          >
            Register Student
          </button>
        </form>
      </div>
    </div>
  );
}
