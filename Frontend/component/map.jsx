import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map({ coordinates }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAP_TOKEN;

    // Create map only once
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: coordinates,
        zoom: 9,
      });

      marker.current = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map.current);
    } else {
      // If map already exists → just update center & marker
      map.current.setCenter(coordinates);
      marker.current.setLngLat(coordinates);
    }

  }, [coordinates]);

  // Cleanup only when component unmounts
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ height: "400px" }}
    />
  );
}