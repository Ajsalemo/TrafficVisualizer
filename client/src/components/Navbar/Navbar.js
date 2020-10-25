import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="inset-x-0 top-0 text-white">
      <Link to="/">Home</Link>
      <Link to="/">Sign in</Link>
      <Link to="/">API Reference</Link>
    </nav>
  );
}
