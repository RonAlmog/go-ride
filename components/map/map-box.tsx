"use client";
import React from "react";
import Map from "react-map-gl";

type Props = {};

const MapBox = (props: Props) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Map</h2>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
};

export default MapBox;