import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";

const Navbar = () => {
  return (
    <nav className="inset-x-0 top-0 text-white h-12 md:flex">
      <div className="hidden md:flex w-full flex justify-between items-center px-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/">Sign in</Link>
      </div>
      {/* Dropdown for mobile viewing */}
      <Dropdown />
    </nav>
  );
};

export default Navbar;
