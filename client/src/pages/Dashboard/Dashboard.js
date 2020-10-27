import { Suspense, lazy } from "react";
import LoadingPageComponent from "../../components/LoadingPageComponent/LoadingPageComponent";

const MapWrapper = lazy(() => import("../../components/MapWrapper"));

export default function App() {
  return (
    <div className="h-screen">
      <Suspense fallback={<LoadingPageComponent />}>
        <MapWrapper />
      </Suspense>
    </div>
  );
}
