  import type { MetaFunction } from "@remix-run/node";
  import FrontPagenavigationBar from "~/COMPONENTS/FrontPagenavigationBar";
  import Footerss from "~/COMPONENTS/footers";
  import { Link } from "@remix-run/react";

  export const meta: MetaFunction = () => {
    return [
      { title: "Coffee Inventory System" },
      { name: "description", content: "Manage and track your coffee stock." },
    ];
  };

  export default function index() {
    return (
      <>
          {/* Front Page Navigation */}
          <FrontPagenavigationBar />
      

        {/* Front Page Content */}
        <main className="flex flex-col items-center justify-center text-center px-6 py-20 bg-white dark:bg-gray-100 min-h-[70vh]">
          <h1 className="text-3xl md:text-4xl font-bold lg: -5xl text-amber-900 mb-6">
            Welcome to Coffee Inventory System
          </h1>
          <p className="text-gray-700 text-md sm:text-lg max-w-2xl mb-10">
            Track, manage, and monitor your coffee products efficiently. Easily update stock, view available sizes, and maintain smooth inventory operations.
          </p>

          <Link
            to="/login"
            className="bg-amber-700 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            View Dashboard
          </Link>
          
        </main>

        {/* Footer */}
        <Footerss />
      </>
    );
  }
