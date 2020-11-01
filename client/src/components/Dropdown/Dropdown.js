import { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const [isOpen, isOpenFunction] = useState(false);
  return (
    <div className="pr-6 relative md:hidden">
      <button
        className="absolute right-0 m-4 h-8 w-8"
        onClick={() => isOpenFunction(!isOpen)}
        aria-label="Dropdown button"
      >
        <i className="fas fa-bars fa-2x"></i>
      </button>
      {isOpen ? (
        <div
          className="absolute mt-16 right-0 py-2 w-48 bg-gray-800 rounded-lg shadow-xl top-12 rounded-md border-solid border-4 border-gray-600"
          onBlur={() => isOpenFunction(!isOpen)}
        >
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-white hover:bg-indigo-500"
            onClick={() => isOpenFunction(!isOpen)}
          >
            Dashboard
          </Link>
          <Link
            to="/"
            className="block px-4 py-2 mt-8 text-white hover:bg-indigo-500"
            onClick={() => isOpenFunction(!isOpen)}
          >
            Sign in
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
