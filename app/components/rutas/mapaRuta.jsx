"use client";

import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "auto",
  height: "90vh",
};

function MapaRuta({ features }) {
  const API_KEY = process.env.NEXT_PUBLIC_API;

  const [centers, setCenters] = useState([]);

  useEffect(() => {
    const newCenters = features.map((feature) => {
      const lat = feature.properties.COORDENADA_Y;
      const lon = feature.properties.COORDENADA_X;
      return { lat, lng: lon };
    });

    setCenters(newCenters);
  }, [features]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      centers.forEach((center) => bounds.extend(center));
      map.fitBounds(bounds);

      setMap(map);
    },
    [centers]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={
            centers.length > 0 ? centers[0] : { lat: -3.745, lng: -38.523 }
          } // Center the map on the first location
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {centers.map((center, index) => (
            <Marker key={index} position={center} />
          ))}
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
}

export default MapaRuta;
