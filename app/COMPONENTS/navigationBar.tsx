import { Link } from "@remix-run/react";

export default function NavigationBar() {
  return (
    <header className="flex justify-center items-center px-10 py-5 bg-gradient-to-r from-amber-950 to-amber-700 text-white">
        <div className="flex items-center gap-5 font-roboto font-extrabold text-md md:text-lg lg:text-2xl cursor-pointer text-[#c69238]">
          <span className="text-6xl"></span>
          <span className="font-semibold text-4xl">C☕︎ff-Yee</span>
        </div>

    <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-4 p-4 w-full">
      {/* HOME Button */}
      <Link
        to="/dashboard"
        className="flex sm:w-auto w-full gap-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-yellow-950 transition"
      >
        <span className="font-medium text-sm">HOME</span>
      </Link>

      {/* ABOUT Button */}
      <Link
        to="/about"
        className="flex sm:w-auto w-full gap-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-yellow-950 transition"
      >
        <span className="font-medium text-sm">ABOUT</span>
      </Link>

      {/* CONTACTS Button */}
      <Link
        to="/contact"
        className="flex sm:w-auto w-full gap-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-yellow-950 transition"
      >
        <span className="font-medium text-sm">CONTACTS</span>
      </Link>

      {/* LOGIN Button */}
      <Link
        to="/login"
        className="flex sm:w-auto w-full items-center justify-center gap-2 px-4 py-2 rounded-md bg-amber-300 hover:bg-gray-300 dark:bg-yellow-900 dark:hover:bg-yellow-800 transition"
      >
        <span className="font-medium text-sm">LOGIN</span>
      </Link>
    </div>

    </header>
  );
}
