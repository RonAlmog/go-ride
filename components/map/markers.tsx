import { Marker } from "react-map-gl";
import React, { useContext } from "react";
import { UseLocationContext } from "@/context/use-location-context";
import { SourceCoordinatesContext } from "@/context/source-context";
import { DestinationCoordinatesContext } from "@/context/destination-context";

type Props = {};

const Markers = (props: Props) => {
  const { userLocation, setUserLocation } = useContext(UseLocationContext);
  const { sourceCoordinates, setSourceCoordinates } = useContext(
    SourceCoordinatesContext
  );
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCoordinatesContext
  );
  return (
    <div>
      <Marker
        longitude={userLocation?.lon}
        latitude={userLocation?.lat}
        anchor="bottom"
      >
        <img src="./pin.png" className="w-10 h-10" />
      </Marker>

      {sourceCoordinates.lon && (
        <Marker
          longitude={sourceCoordinates?.lon}
          latitude={sourceCoordinates?.lat}
          anchor="bottom"
        >
          <img src="./pin.png" className="w-10 h-10" />
        </Marker>
      )}

      {destinationCoordinates.lon && (
        <Marker
          longitude={destinationCoordinates?.lon}
          latitude={destinationCoordinates?.lat}
          anchor="bottom"
        >
          <img src="./pin.png" className="w-10 h-10" />
        </Marker>
      )}
    </div>
  );
};

export default Markers;
