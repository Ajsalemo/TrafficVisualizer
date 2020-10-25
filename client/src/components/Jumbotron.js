import TrafficBackgroundImage from "../assets/images/traffic.jpg";
import Navbar from "./Navbar/Navbar";

export default function Jumbotron() {
  return (
    <div
      style={{ backgroundImage: `url(${TrafficBackgroundImage})` }}
      className="bg-right h-screen"
    >
      <Navbar />
    </div>
  );
}
