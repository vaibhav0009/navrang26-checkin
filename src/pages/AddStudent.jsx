import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!student.name || !student.rollNo || !student.dob) {
      toast.error("Please fill all fields.");
      return;
    }

    const existingStudents = JSON.parse(localStorage.getItem("students")) || [];

    const duplicateStudent = existingStudents.find(
      (s) => s.rollNo.toLowerCase() === student.rollNo.toLowerCase(),
    );

    if (duplicateStudent) {
      toast.error("Student with this Roll Number already exists.");
      return;
    }

    const updatedStudents = [...existingStudents, student];

    localStorage.setItem("students", JSON.stringify(updatedStudents));

    toast.success("Student Added Successfully!");

    setStudent({
      name: "",
      rollNo: "",
      dob: "",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1026] via-[#1A103D] to-[#2E1065] flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-400/20">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">
          Add New Student
        </h1>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={student.name}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 text-white border border-purple-300/20 outline-none"
          />

          <input
            type="text"
            name="rollNo"
            placeholder="Roll Number"
            value={student.rollNo}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 text-white border border-purple-300/20 outline-none"
          />

          <input
            type="date"
            name="dob"
            value={student.dob}
            onChange={handleChange}
            className="p-3 rounded-xl bg-white/10 text-white border border-purple-300/20 outline-none"
          />

          <button
            type="submit"
            className="md:col-span-2 py-3 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 text-white font-semibold"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
}
