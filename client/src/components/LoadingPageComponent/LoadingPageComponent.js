const LoadingPageComponent = () => {
  return (
    <div className="h-screen bg-black">
      <div className="flex flex-col justify-center items-center h-full font-sans">
        <div className="shadow-xl bg-gray-900 p-2 rounded-md border-solid border-4 border-gray-600">
          <span className="text-white text-5xl">Loading..</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPageComponent;
