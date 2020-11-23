import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import SaveLocationButton from "../SaveLocationButton/SaveLocationButton";

// This code is referenced from - https://developer.here.com/tutorials/react/#a-note-on-hooks
const DisplayMap = ({
  addressValue,
  userObject,
  locationAlreadySaved,
  locationId,
}) => {
  // Used two separate useState functions to avoid circular calls when setting this to an object with the properties 'lat' and 'lng'
  // Additionally this makes use of the dependency array in useLayoutEffect as opposed to ignoring it
  const [lat, updateLat] = useState("40.730610");
  const [lng, updateLng] = useState("-73.935242");
  const [error, setError] = useState(false);
  const location = useLocation();
  const locationURL = location.pathname;
  const searchQueryTerm = addressValue !== "" ? addressValue : "New York City";
  // Create a reference to the HTML element we want to put the map on
  const mapRef = useRef(null);
  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const H = window.H;
    // Check if service is available in 'window' yet
    if (H && H.service !== null) {
      const platform = new H.service.Platform({
        apikey: `${process.env.REACT_APP_HERE_DEVELOPER_MAP_API_KEY}`,
      });
      // Geocode service
      const service = platform.getSearchService();
      const defaultLayers = platform.createDefaultLayers();
      const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        // Defaults to NYC
        center: { lat: lat, lng: lng },
        zoom: 16,
        pixelRatio: window.devicePixelRatio || 1,
      });
      service.geocode(
        {
          q: searchQueryTerm,
        },
        (result) => {
          // If position is undefined, this means that the location doesn't exist
          // Set the error boolean to true so the error text can be displayed
          if (!result.items[0]) return setError(true);
          // Add a marker for each location found
          result.items.forEach((item) => {
            hMap.addObject(new H.map.Marker(item.position));
          });
          updateLat(result.items[0].position.lat);
          updateLng(result.items[0].position.lng);
          setError(false);
        },
        alert
      );
      // Display traffic flow on the map
      // Map legend:
      // Green: Traffic flowing freely
      // Orange: Moderate traffic
      // Red: Congested
      hMap.addLayer(defaultLayers.vector.normal.traffic);
      // Display traffic incidents on the map
      hMap.addLayer(defaultLayers.vector.normal.trafficincidents);
      // These two variables are unused on purpose
      // eslint-disable-next-line no-unused-vars
      const behavior = new H.mapevents.Behavior(
        new H.mapevents.MapEvents(hMap)
      );
      // eslint-disable-next-line no-unused-vars
      const ui = H.ui.UI.createDefault(hMap, defaultLayers);
      // This will act as a cleanup to run once this hook runs again.
      // This includes when the component un-mounts
      return () => {
        hMap.dispose();
      };
    }
  }, [mapRef, searchQueryTerm, lat, lng, error]); // This will run this hook every time this ref is updated

  return (
    <div className="text-center">
      <div className="map" ref={mapRef} style={{ height: "500px" }} />
      <div className="flex flex-col">
        <span className="text-white italic text-xs">
          Traffic data is updated every three(3) minutes.
        </span>
        {locationURL !== "/profile" ? (
          !error ? (
            <Fragment>
              <h2 className="text-white">
                Your location is currently set to{" "}
                <span className="text-blue-900">{searchQueryTerm}</span>
              </h2>
              <SaveLocationButton
                addressValue={searchQueryTerm}
                userObject={userObject}
                locationAlreadySaved={locationAlreadySaved}
                locationId={locationId}
              />
            </Fragment>
          ) : (
            <span className="text-red-600">
              That location doesn't seem to exist.
            </span>
          )
        ) : null}
      </div>
    </div>
  );
};

export default DisplayMap;
