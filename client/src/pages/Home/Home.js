import { lazy, Suspense } from "react";
import LoadingPageComponent from "../../components/LoadingPageComponent/LoadingPageComponent";

const LazyJumbotron = lazy(() => import("../../components/Jumbotron"));

export default function App() {
  return (
    <div className="-mt-12">
      <Suspense fallback={<LoadingPageComponent />}>
        <LazyJumbotron />
      </Suspense>
    </div>
  );
}
