
import { Link } from "@remix-run/react";
import yearToday from "~/utils/yearToday";

const Footerss = () => {
  const year = yearToday();
  return (
    <footer className="bottom-0 flex justify-center items-center font-sans font-bold text-xs md:text-sm lg:text-md text-gray-500 py-10 w-full">
      © {year} C☕︎ff-Yee Web App | All Rights Reserved.
    </footer>
  );
};

export default Footerss;