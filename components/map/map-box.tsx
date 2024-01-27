"use client";
import { UseLocationContext } from "@/context/use-location-context";
import React, { useContext, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Markers from "./markers";
import { SourceCoordinatesContext } from "@/context/source-context";
import { DestinationCoordinatesContext } from "@/context/destination-context";
import { v4 as uuidv4 } from "uuid";
import { DirectionDataContext } from "@/context/direction-context";
import MapboxRoute from "./mapbox-route";
import DistanceTime from "./distance-time";

const MAPBOX_DRIVING_URL =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const sessionToken = uuidv4();

type Props = {};

const MapBox = (props: Props) => {
  const { userLocation, setUserLocation } = useContext(UseLocationContext);
  const { sourceCoordinates, setSourceCoordinates } = useContext(
    SourceCoordinatesContext
  );
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCoordinatesContext
  );
  const { directionData, setDirectionData } = useContext(DirectionDataContext);

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
    if (destinationCoordinates.lon) {
      mapRef.current?.flyTo({
        center: [destinationCoordinates.lon, destinationCoordinates.lat],
        duration: 2500,
      });
    }
    if (sourceCoordinates && destinationCoordinates) {
      getDirectionRoute();
    }
  }, [destinationCoordinates, sourceCoordinates]);

  const getDirectionRoute = async () => {
    const res = await fetch(
      `${MAPBOX_DRIVING_URL}${sourceCoordinates.lon},${sourceCoordinates.lat};${destinationCoordinates.lon},${destinationCoordinates.lat}?overview=full&geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    console.log(result);
    setDirectionData(result);
  };
  return (
    <div className="p-5 relative">
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
            {directionData?.routes ? (
              <MapboxRoute
                coordinates={directionData?.routes[0]?.geometry?.coordinates}
              />
            ) : null}
          </Map>
        ) : null}
      </div>
      <div className="absolute bottom-10 z-20 right-5 hidden md:block">
        <DistanceTime />
      </div>
    </div>
  );
};

export default MapBox;
