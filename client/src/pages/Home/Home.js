import { lazy, Suspense } from "react";

const LazyJumbotron = lazy(() => import("../../components/Jumbotron"));

export default function App() {
  return (
    <div className="-mt-12">
      <Suspense fallback={<div>Loading...</div>}>
        <LazyJumbotron />
      </Suspense>
    </div>
  );
}
