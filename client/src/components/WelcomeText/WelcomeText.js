import { Link } from "react-router-dom";

export default function WelcomeText() {
  return (
    <div className="flex flex-col justify-center items-center h-full font-sans">
      <div className="shadow-xl bg-gray-900 p-2 rounded-md border-solid border-4 border-gray-600">
        <h1 className="text-white text-5xl">TrafficVisualizer</h1>
        <h2 className="text-blue-600 text-3xl italic">
          Visualize traffic data.
        </h2>
      </div>
      <Link
        to="/dashboard"
        className="focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-blue-900 text-white mt-12"
      >
        Search
      </Link>
    </div>
  );
}
