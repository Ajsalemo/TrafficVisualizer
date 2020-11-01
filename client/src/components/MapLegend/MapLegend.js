const MapLegend = () => {
  return (
    <div className="pt-12 flex items-center text-center flex-col">
      <span className="border-green-300 w-1/2 sm:w-1/4 border-t-4 h-2 text-white">
        Free flowing traffic
      </span>
      <span className="border-yellow-400 w-1/2 sm:w-1/4 border-t-4 h-2 text-white mt-12">
        Moderate congestion
      </span>
      <span className="border-red-400 w-1/2 sm:w-1/4 border-t-4 h-2 text-white mt-12">
        Heavy congestion
      </span>
    </div>
  );
};

export default MapLegend;
