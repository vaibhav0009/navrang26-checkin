import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AllStudents() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (!isAdminLoggedIn) {
      navigate("/admin-login");
      return;
    }

    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];

    setStudents(savedStudents);
  }, [navigate]);

  const handleDelete = (rollNo) => {
    const updatedStudents = students.filter(
      (student) => student.rollNo !== rollNo,
    );

    setStudents(updatedStudents);

    localStorage.setItem("students", JSON.stringify(updatedStudents));

    toast.success("Student Deleted Successfully!");
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B1026] via-[#1A103D] to-[#2E1065] p-6">
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-400/20">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">
          All Registered Students
        </h1>

        <input
          type="text"
          placeholder="Search by Name or Roll Number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl bg-white/10 text-white border border-purple-300/20 outline-none"
        />

        {filteredStudents.length === 0 ? (
          <p className="text-purple-200">No students found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-white">
              <thead>
                <tr className="border-b border-purple-300/20">
                  <th className="py-3">Name</th>
                  <th className="py-3">Roll Number</th>
                  <th className="py-3">DOB</th>
                  <th className="py-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={index}>
                    <td className="py-3">{student.name}</td>
                    <td className="py-3">{student.rollNo}</td>
                    <td className="py-3">{student.dob}</td>
                    <td className="py-3">
                      <button
                        onClick={() => handleDelete(student.rollNo)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg"
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
