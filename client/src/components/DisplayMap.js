import { useLayoutEffect, useRef, useState } from "react";

// This code is referenced from - https://developer.here.com/tutorials/react/#a-note-on-hooks
export default function DisplayMap({ addressValue }) {
  // Used two separate useState functions to avoid circular calls when setting this to an object with the properties 'lat' and 'lng'
  // Additionally this makes use of the dependency array in useLayoutEffect as opposed to ignoring it
  const [lat, updateLat] = useState("40.730610");
  const [lng, updateLng] = useState("-73.935242");
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
        // Hardcoded to NYC at this time
        center: { lat: lat, lng: lng },
        zoom: 12,
        pixelRatio: window.devicePixelRatio || 1,
      });
      service.geocode(
        {
          q: addressValue !== "" ? addressValue : "New York City",
        },
        (result) => {
          // Add a marker for each location found
          result.items.forEach((item) => {
            hMap.addObject(new H.map.Marker(item.position));
          });
          updateLat(result.items[0].position.lat)
          updateLng(result.items[0].position.lng)
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
  }, [mapRef, addressValue, lat, lng]); // This will run this hook every time this ref is updated

  return <div className="map" ref={mapRef} style={{ height: "500px" }} />;
}
