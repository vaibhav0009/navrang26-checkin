import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function EntryLogin() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

 const handleLogin = async (e) => {
   e.preventDefault();

   if (!loginData.email || !loginData.password) {
     toast.error("Please fill all fields.");
     return;
   }

   try {
     const userCredential = await signInWithEmailAndPassword(
       auth,
       loginData.email,
       loginData.password,
     );

     const user = userCredential.user;

     const userDoc = await getDoc(doc(db, "users", user.uid));

     if (!userDoc.exists() || userDoc.data().role !== "entryStaff") {
       await auth.signOut();
       toast.error("Not authorized as Entry Staff");
       return;
     }

     toast.success("Entry Staff Login Successful!");
     navigate("/entry-dashboard");
   } catch (error) {
     console.error(error);
     toast.error("Invalid Entry Staff Credentials");
   }
 };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-[#0B1020] via-[#111827] to-[#1F2937] flex items-center justify-center px-4">
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/15 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md rounded-4xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(251,146,60,0.12)] p-8">
        <p className="text-center text-sm tracking-[0.3em] text-orange-200 mb-2">
          ENTRY STAFF LOGIN
        </p>

        <h1 className="text-4xl font-bold text-center bg-linear-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
          Verification Portal
        </h1>

        <p className="text-center text-gray-300 mb-8 text-sm">
          Login to begin scanning and approving attendee entries
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Staff Email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none placeholder:text-gray-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/5 text-white border border-white/10 outline-none placeholder:text-gray-400"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Start Verification
          </button>
        </form>
      </div>
    </div>
  );
}
