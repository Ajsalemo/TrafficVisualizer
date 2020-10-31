import { Suspense, lazy } from "react";
import Footer from "../../components/Footer/Footer";
import LoadingPageComponent from "../../components/LoadingPageComponent/LoadingPageComponent";
import MapLegend from "../../components/MapLegend/MapLegend"

const MapWrapper = lazy(() => import("../../components/MapWrapper"));

export default function App() {
  return (
    <div className="h-screen">
      <Suspense fallback={<LoadingPageComponent />}>
        <MapWrapper />
        <MapLegend />
      </Suspense>
      <Footer />
    </div>
  );
}
