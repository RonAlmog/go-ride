"use client";
import { UseLocationContext } from "@/context/use-location-context";
import React, { useContext, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./markers";
import { SourceCoordinatesContext } from "@/context/source-context";
import { DestinationCoordinatesContext } from "@/context/destination-context";

type Props = {};

const MapBox = (props: Props) => {
  const { userLocation, setUserLocation } = useContext(UseLocationContext);
  const { sourceCoordinates, setSourceCoordinates } = useContext(
    SourceCoordinatesContext
  );
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCoordinatesContext
  );
  const mapRef = useRef<any>();
  useEffect(() => {
    if (sourceCoordinates) {
      mapRef.current?.flyTo({
        center: [sourceCoordinates.lon, sourceCoordinates.lat],
        duration: 2500,
      });
    }
  }, [sourceCoordinates]);
  useEffect(() => {
    if (destinationCoordinates) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates.lon, destinationCoordinates.lat],
        duration: 2500,
      });
    }
  }, [destinationCoordinates]);
  return (
    <div className="p-5">
      <h2 className="text-lg font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lon,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 450, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
          </Map>
        ) : null}
      </div>
    </div>
  );
};

export default MapBox;
