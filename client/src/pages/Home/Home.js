import { lazy, Suspense } from "react";
import LoadingPageComponent from "../../components/LoadingPageComponent/LoadingPageComponent";

const LazyJumbotron = lazy(() => import("../../components/Jumbotron/Jumbotron"));

const Home = () => {
  return (
    <div className="-mt-12">
      <Suspense fallback={<LoadingPageComponent />}>
        <LazyJumbotron />
      </Suspense>
    </div>
  );
};

export default Home;
