import TrafficBackgroundImage from "../assets/images/traffic.jpg";
import WelcomeText from "./WelcomeText/WelcomeText";

const Jumbotron = () => {
  return (
    <div
      style={{ backgroundImage: `url(${TrafficBackgroundImage})` }}
      className="bg-right bg-no-repeat h-screen"
    >
      <WelcomeText />
    </div>
  );
};

export default Jumbotron;
