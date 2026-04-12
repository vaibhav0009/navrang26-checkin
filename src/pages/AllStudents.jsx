import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function AllStudents() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    try {
      const querySnapshot = await getDocs(collection(db, "students"));

      const studentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setStudents(studentsData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch students.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));

      const updatedStudents = students.filter((student) => student.id !== id);

      setStudents(updatedStudents);

      toast.success("Student Deleted Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete student.");
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] px-4 py-8">
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto rounded-4xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(251,146,60,0.12)] p-8">
        <p className="text-sm tracking-[0.3em] text-orange-200 mb-2">
          STUDENT DATABASE
        </p>

        <h1 className="text-4xl font-bold bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
          Registered Attendees
        </h1>

        <p className="text-gray-300 mb-6">
          Search and manage all approved fresher registrations
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-3">
            <input
              type="text"
              placeholder="Search by Name or Roll Number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none"
            />
          </div>

          <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
            <p className="text-xs text-orange-200">Total Students</p>
            <p className="text-2xl font-bold text-white">{students.length}</p>
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center">
            <p className="text-gray-300">
              No students found matching your search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left text-white">
              <thead className="bg-white/5">
                <tr>
                  <th className="py-4 px-4">Name</th>
                  <th className="py-4 px-4">Roll Number</th>
                  <th className="py-4 px-4">DOB</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="py-4 px-4">{student.name}</td>
                    <td className="py-4 px-4">{student.rollNo}</td>
                    <td className="py-4 px-4">{student.dob}</td>

                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                        Approved
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
