import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <nav className="inset-x-0 top-0 text-white h-12 md:flex">
      <div className="hidden md:flex w-full flex justify-between items-center px-4">
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={() => loginWithRedirect()}>
          Sign in
        </button>
      </div>
      {/* Dropdown for mobile viewing */}
      <Dropdown />
    </nav>
  );
};

export default Navbar;
