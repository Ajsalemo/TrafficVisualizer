import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown"

export default function Navbar() {
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
}
