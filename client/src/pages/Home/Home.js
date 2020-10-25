import { lazy, Suspense } from "react";

const LazyJumbotron = lazy(() => import("../../components/Jumbotron"));

export default function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyJumbotron />
      </Suspense>
    </div>
  );
}
