import { Link } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown"

export default function Navbar() {
  return (
    <nav className="inset-x-0 top-0 text-white h-12 md:flex">
      <div className="hidden md:flex w-full flex justify-evenly items-center">
        <Link to="/">Home</Link>
        <Link to="/">Sign in</Link>
        <Link to="/">Search</Link>
        <Link to="/">API Reference</Link>
      </div>
      {/* Dropdown for mobile viewing */}
      <Dropdown />
    </nav>
  );
}
