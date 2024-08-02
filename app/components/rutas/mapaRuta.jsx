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

function MapaRuta({ features }) {
  const API_KEY = process.env.NEXT_PUBLIC_API;

  const [centers, setCenters] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const newCenters = features.map((feature) => {
      const lat = feature.properties.COORDENADA_Y;
      const lon = feature.properties.COORDENADA_X;
      const name = feature.properties.Name;
      const idCliente = feature.properties.ID_Cliente;
      return { lat, lng: lon, name, idCliente, color: "gray" };
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

  const handleClick = (color) => {
    const updatedCenters = centers.map((center) =>
      center.lat === selected.lat && center.lng === selected.lng
        ? { ...center, color }
        : center
    );
    setCenters(updatedCenters);
    setSelected({ ...selected, color });
  };

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
            <Marker
              key={index}
              position={{ lat: center.lat, lng: center.lng }}
              onClick={() => setSelected(center)}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: center.color,
                fillOpacity: 1,
                strokeWeight: 1,
              }}
            />
          ))}

          {selected && (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => setSelected(null)}
            >
              <div className="text-center">
                <h2 className="font-bold">{selected.name}</h2>
                <p>ID Cliente: {selected.idCliente}</p>
                <div className="flex flex-col items-center justify-center">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleClick("red")}
                  >
                    <p className="m-1 w-10">Perdido</p>
                    <p className="bg-red-500 w-3 h-3 rounded-full"></p>
                  </div>
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleClick("yellow")}
                  >
                    <p className="m-1 w-10">Proceso</p>
                    <p className="bg-yellow-500 w-3 h-3 rounded-full"></p>
                  </div>
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleClick("green")}
                  >
                    <p className="m-1 w-10">Ganado</p>
                    <p className="bg-green-500 w-3 h-3 rounded-full"></p>
                  </div>
                </div>
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

export default MapaRuta;
