import { useState } from "react";
import { Link } from "react-router-dom";
import AuthenticationButtons from "../AuthenticationButtons/AuthenticationButtons";
import { useAuth0 } from "@auth0/auth0-react";

const Dropdown = () => {
  const [isOpen, isOpenFunction] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  return (
    <div
      className={isAuthenticated ? "pr-6 relative" : "pr-6 relative md:hidden"}
    >
      <button
        className="absolute right-0 m-4 h-12 w-12"
        onClick={() => isOpenFunction(!isOpen)}
        aria-label="Dropdown button"
      >
        {isAuthenticated ? (
          <img
            src={user.picture}
            className="rounded-full"
            alt="User profile"
          ></img>
        ) : (
          <i className="fas fa-bars fa-2x"></i>
        )}
      </button>
      {isOpen && (
        <div
          className="z-10 absolute mt-16 right-0 py-2 w-48 bg-gray-800 rounded-lg shadow-xl top-12 rounded-md border-solid border-4 border-gray-600"
          onBlur={() => isOpenFunction(!isOpen)}
        >
          {isAuthenticated && (
            <span className="block px-4 py-2 mb-8 text-white">
              Welcome, {user.name}
            </span>
          )}
          <Link
            to="/dashboard"
            className="block px-4 py-2 mb-8 text-white hover:bg-indigo-500"
            onClick={() => isOpenFunction(!isOpen)}
          >
            Dashboard
          </Link>
          {isAuthenticated && (
            <Link
              to="/profile"
              className="block px-4 py-2 text-white hover:bg-indigo-500"
              onClick={() => isOpenFunction(!isOpen)}
            >
              Profile
            </Link>
          )}
          <AuthenticationButtons tailwindClasses="block px-4 py-2 mt-2 text-white hover:bg-indigo-500" />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
