import { Suspense, lazy } from "react";
import Footer from "../../components/Footer/Footer";
import LoadingPageComponent from "../../components/LoadingPageComponent/LoadingPageComponent";
import MapLegend from "../../components/MapLegend/MapLegend";

const MapWrapper = lazy(() => import("../../components/MapWrapper/MapWrapper"));

const Dashboard = ({ userObject }) => {
  return (
    <div className="h-screen">
      <Suspense fallback={<LoadingPageComponent />}>
        <MapWrapper userObject={userObject} />
        <MapLegend />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Dashboard;
