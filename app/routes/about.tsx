import type { MetaFunction } from "@remix-run/node";
import NavigationBar from "~/COMPONENTS/navigationBar";
import Footerss from "~/COMPONENTS/footers";

export const meta: MetaFunction = () => {
  return [
    { title: "About - Coffee Inventory System" },
    { name: "description", content: "Learn more about the Coffee Inventory System and its purpose." },
  ];
};

export default function About() {
  return (
    <>
      {/* Navigation */}
      <NavigationBar />

      {/* About Page Content */}
      <main className="px-6 py-20 bg-white dark:bg-gray-100 min-h-[70vh]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
            About Coffee Inventory System
          </h1>
          <p className="text-gray-700 text-md sm:text-lg mb-6">
            The Coffee Inventory System is designed to help coffee shop owners, warehouse managers, and suppliers track and manage their coffee stocks with ease and accuracy. Whether you're handling raw beans or packaged products, this system gives you clear visibility of your inventory levels, product sizes, and movement history.
          </p>
          <p className="text-gray-700 text-md sm:text-lg mb-6">
            Built with modern web technologies like <strong>Remix</strong>, <strong>Tailwind CSS</strong>, and a <strong>C#.NET API</strong> backend, it ensures fast performance, smooth interaction, and real-time data integration. This solution is perfect for teams aiming to reduce waste, avoid stockouts, and improve operational efficiency.
          </p>
          <p className="text-gray-700 text-md sm:text-lg">
            We are committed to providing tools that help you focus more on your coffee business and less on manual tracking.
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footerss />
    </>
  );
}
