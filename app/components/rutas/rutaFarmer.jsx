"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const containerStyle = {
  width: "auto",
  height: "90vh",
};

function RutaFarmer({ features }) {
  const API_KEY = process.env.NEXT_PUBLIC_API;

  const [centers, setCenters] = useState([]);
  const [selected, setSelected] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const newCenters = features.map((feature) => {
      const lon = parseFloat(feature.properties.COORDENADA_Y); // Latitud
      const lat = parseFloat(feature.properties.COORDENADA_X); // Longitud
      const name = feature.properties.Name;
      const idCliente = feature.properties.ID_Cliente;
      return {
        lat,
        lng: lon,
        name,
        idCliente,
      };
    });

    setCenters(newCenters);
  }, [features]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      centers.forEach((center) => bounds.extend(center));
      if (userLocation) {
        bounds.extend(userLocation);
      }
      map.fitBounds(bounds);

      setMap(map);
    },
    [centers, userLocation]
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
          }
          zoom={14}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {centers.map((center, index) => (
            <Marker
              key={index}
              position={{ lat: center.lat, lng: center.lng }}
              onClick={() => setSelected(center)}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "gray", // Default color for all markers
                fillOpacity: 1,
                strokeWeight: 1,
              }}
            />
          ))}

          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "blue",
                fillOpacity: 1,
                strokeWeight: 1,
              }}
            />
          )}

          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div className="text-center">
                <h2 className="font-bold">{selected.name}</h2>
                <p>ID Cliente: {selected.idCliente}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <></>
      )}
    </>
  );
}

export default RutaFarmer;
