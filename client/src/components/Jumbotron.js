import TrafficBackgroundImage from "../assets/images/traffic.jpg";
import WelcomeText from "./WelcomeText/WelcomeText";

export default function Jumbotron() {
  return (
    <div
      style={{ backgroundImage: `url(${TrafficBackgroundImage})` }}
      className="bg-right bg-no-repeat h-screen"
    >
      <WelcomeText />
    </div>
  );
}
