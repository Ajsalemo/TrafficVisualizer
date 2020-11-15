const LoadingPageComponent = () => {
  return (
    <div className="h-screen bg-black">
      <div className="flex flex-col justify-center items-center h-full font-sans">
        <div className="shadow-xl bg-gray-900 p-2 rounded-md border-solid border-4 border-gray-600">
          <i className="fas fa-spinner animate-spin fa-3x text-white" aria-label="loading"></i>
        </div>
      </div>
    </div>
  );
};

export default LoadingPageComponent;
