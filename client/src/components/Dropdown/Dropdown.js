import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dropdown() {
  const [isOpen, isOpenFunction] = useState(false);
  return (
    <div className="pr-6 relative md:hidden">
      <button
        className="absolute right-0 m-4 h-8 w-8"
        onClick={() => isOpenFunction(!isOpen)}
        onBlur={() => isOpenFunction(!isOpen)}
        aria-label="Dropdown button"
      >
        <i className="fas fa-bars fa-2x"></i>
      </button>
      {isOpen ? (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl top-12">
          <Link
            to="/"
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Home
          </Link>
        </div>
      ) : null}
    </div>
  );
}
