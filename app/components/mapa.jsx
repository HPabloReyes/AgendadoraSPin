"use client";

import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "auto",
  height: "300px",
};

function Mapa({ ubicacion }) {
  const API_KEY = process.env.NEXT_PUBLIC_API;
  let KEY = "AIzaSyB6m78RYq8-EuPcpvdJYMSMfEOjWQmbep0";
  const regex = /Lat:\s*([-?\d.]+),\s*Lon:\s*([-?\d.]+)/;
  const matches = ubicacion.match(regex);

  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });

  useEffect(() => {
    if (matches) {
      const lat = parseFloat(matches[1]);
      const lon = parseFloat(matches[2]);
      setCenter({ lat: lat, lng: lon });
    } else {
      console.error(
        "No se pudieron extraer las coordenadas de la cadena de texto."
      );
    }
  }, [ubicacion]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: KEY,
    //googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    function callback(map) {
      // Ensure we use the most recent center coordinates
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
}

export default Mapa;
