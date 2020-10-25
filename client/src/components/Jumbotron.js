import TrafficBackgroundImage from "../assets/images/traffic.jpg";

export default function Jumbotron() {
  return (
    <div
      style={{ backgroundImage: `url(${TrafficBackgroundImage})` }}
      className="bg-right h-screen"
    ></div>
  );
}
