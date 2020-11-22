import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const locationURL = location.pathname;
  return (
    <nav
      className={
        locationURL === "/dashboard"
          ? "text-white h-40 mt-24 bg-gray-600 border-solid border-4 border-black"
          : "inset-x-0 bottom-0 text-white h-40 mt-24 bg-gray-600 border-solid border-4 border-black"
      }
    >
      <div className="flex flex-col items-center text-white mt-8 text-sm">
        <Link to="/dashboard" className="hover:underline">
          Home
        </Link>
        <a
          href="https://developer.here.com/documentation/maps/3.1.19.2/dev_guide/index.html"
          rel="noopener noreferrer"
          target="_blank"
          className="py-2 hover:underline transition ease-in-out duration-700"
        >
          HERE Developer API Reference
        </a>
        <a
          href="https://github.com/Ajsalemo/TrafficVisualizer"
          rel="noopener noreferrer"
          target="_blank"
          className="hover:underline"
        >
          Github
        </a>
      </div>
    </nav>
  );
};

export default Footer;
