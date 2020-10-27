import { Suspense, lazy } from "react";
import LoadingPageComponent from "../../components/LoadingPageComponent/LoadingPageComponent";

const LazyPlaceholder = lazy(() => import("../../components/WelcomeText/WelcomeText"));

export default function App() {
  return (
    <div className="h-screen">
      <Suspense fallback={<LoadingPageComponent />}>
        <LazyPlaceholder />
      </Suspense>
    </div>
  );
}
