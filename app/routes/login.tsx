import type { MetaFunction } from "@remix-run/node";
import NavigationBar from "~/COMPONENTS/navigationBar";
import Footerss from "~/COMPONENTS/footers";
import { useState } from "react";
import api from "~/utils/axios"; // Make sure this path is correct

export const meta: MetaFunction = () => {
  return [
    { title: "Login - Coffee Inventory System" },
    { name: "description", content: "Login to access your coffee inventory dashboard." },
  ];
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await api.post("/auth/login", { email, password });
      
      // You can store token/session if returned
      console.log("Login successful:", response.data);

      // Redirect to dashboard
      window.location.href = "/dashboard"; 
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      setErrorMsg("Invalid email or password.");
    }
  };

  return (
    <>
      <NavigationBar />

      <main className="flex items-center justify-center px-6 py-20 bg-white dark:bg-gray-100 min-h-[70vh]">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h1 className="text-2xl font-bold text-amber-900 mb-6 text-center">Login to Your Account</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                Email
              </label>
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
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                Password
              </label>
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

            <button
              type="submit"
              className="w-full bg-amber-700 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account? <a href="/signup" className="text-amber-700 hover:underline">Register here</a>
          </p>
        </div>
      </main>

      <Footerss />
    </>
  );
}
