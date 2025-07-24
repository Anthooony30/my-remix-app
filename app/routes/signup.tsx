import type { MetaFunction } from "@remix-run/node";
import NavigationBar from "~/COMPONENTS/navigationBar";
import Footerss from "~/COMPONENTS/footers";
import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import api from "~/utils/axios";
import FrontPagenavigationBar from "~/COMPONENTS/FrontPagenavigationBar";

export const meta: MetaFunction = () => {
  return [
    { title: "Register - Coffee Inventory System" },
    { name: "description", content: "Create an account to access the coffee inventory dashboard." },
  ];
};

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await api.post("/auth/register", {
        fullName,
        email,
        password,
      });

      setSuccessMsg("Registered successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Redirect after 2 seconds
    } catch (error: any) {
      console.error("Registration error:", error);
      setErrorMsg(error.response?.data || "Something went wrong.");
    }
  };

  return (
    <>
      <FrontPagenavigationBar />

      <main className="flex items-center justify-center px-6 py-20 bg-white dark:bg-gray-100 min-h-[70vh]">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-bold text-amber-900 mb-6 text-center">Create a New Account</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
            </div>

            {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
            {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <a href="/login" className="text-amber-700 hover:underline">Login here</a>
          </p>
        </div>
      </main>

      <Footerss />
    </>
  );
}
