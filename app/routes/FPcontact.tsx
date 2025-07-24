import type { MetaFunction } from "@remix-run/node";
import NavigationBar from "~/COMPONENTS/navigationBar";
import Footerss from "~/COMPONENTS/footers";
import FrontPagenavigationBar from "~/COMPONENTS/FrontPagenavigationBar";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact - Coffee Inventory System" },
    { name: "description", content: "Get in touch with the Coffee Inventory System team." },
  ];
};

export default function Contact() {
  return (
    <>
      {/* Navigation */}
      <FrontPagenavigationBar />

      {/* Contact Page Content */}
      <main className="px-6 py-20 bg-white dark:bg-gray-100 min-h-[70vh]">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">
            Contact Us
          </h1>
          <p className="text-gray-700 text-md sm:text-lg mb-8">
            Have a question, suggestion, or need support? We'd love to hear from you. Reach out to us through the details below or send us a message using the form.
          </p>

          <div className="text-left bg-gray-50 p-6 rounded-lg shadow-md mb-10">
            <p className="mb-2 text-black"><strong>Email:</strong> support@coff-yeeinventory.com</p>
            <p className="mb-2 text-black"><strong>Phone:</strong> +63 992-039-1901</p>
            <p className="mb-2 text-black"><strong>Open hours:</strong> Monday - Sunday, 8:00 AM - 5:00 PM</p>
          </div>

          {/* Contact Form */}
          <form className="space-y-6 text-left">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" className="w-full text-black px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="w-full text-black px-4 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" rows={5} className="w-full text-black px-4 py-2 border border-gray-300 rounded-md" />
            </div>  
            <button type="submit" className="bg-amber-700 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-md">
              Send Message
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footerss />
    </>
  );
}
