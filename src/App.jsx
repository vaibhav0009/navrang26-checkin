import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddStudent from "./pages/AddStudent";
import AllStudents from "./pages/AllStudents";
import StudentLogin from "./pages/StudentLogin";
import UserDashboard from "./pages/UserDashboard";
import Profile from "./pages/Profile";
import EntryStaffDashboard from "./pages/EntryStaffDashboard";
import EntryLogin from "./pages/EntryLogin";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1A103D",
            color: "#fff",
            border: "1px solid rgba(168,85,247,0.3)",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/students" element={<AllStudents />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/entry-login" element={<EntryLogin />} />
        <Route path="/entry-dashboard" element={<EntryStaffDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
