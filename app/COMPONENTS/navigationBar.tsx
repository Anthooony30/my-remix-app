import { useState } from "react";
import { useNavigate } from "@remix-run/react";

export default function NavigationBar() {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogoutConfirm = () => {
    setShowConfirm(false);
    // Optional: Clear session or token
    navigate("/login");
  };

  return (
    <>
      {/* Main Navigation */}
      <header className="flex justify-center items-center px-10 py-5 bg-gradient-to-r from-amber-950 to-amber-700 text-white">
        <div className="flex items-center gap-5 font-roboto font-extrabold text-md md:text-lg lg:text-2xl cursor-pointer text-[#c69238]">
          <span className="text-6xl"></span>
          <span className="font-semibold text-4xl">C☕︎ff-Yee</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-4 p-4 w-full">
          <a
            href="/dashboard"
            className="flex sm:w-auto w-full gap-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-yellow-950 transition"
          >
            <span className="font-medium text-sm">HOME</span>
          </a>

          <a
            href="/about"
            className="flex sm:w-auto w-full gap-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-yellow-950 transition"
          >
            <span className="font-medium text-sm">ABOUT</span>
          </a>

          <a
            href="/contact"
            className="flex sm:w-auto w-full gap-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-yellow-950 transition"
          >
            <span className="font-medium text-sm">CONTACTS</span>
          </a>

          {/* LOGOUT Button */}
          <button
            onClick={() => setShowConfirm(true)}
            className="flex sm:w-auto w-full items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#ac1414] hover:bg-[#e81b1b] transition"
          >
            <span className="font-medium text-sm">LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Logout Confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
