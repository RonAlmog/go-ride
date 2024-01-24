"use client";
import Booking from "@/components/booking/booking";
import MapBox from "@/components/map/map-box";
import { DestinationCoordinatesContext } from "@/context/destination-context";
import { SourceCoordinatesContext } from "@/context/source-context";
import { UseLocationContext } from "@/context/use-location-context";
import { useEffect, useState } from "react";

export default function Home() {
  const [userLocation, setUserLocation] = useState<any>();
  const [sourceCoordinates, setSourceCoordinates] = useState<any>([]);
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>([]);

  useEffect(() => {
    getUserLocation();
  }, []);
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  };
  return (
    <main className="p-1">
      <UseLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCoordinatesContext.Provider
          value={{ sourceCoordinates, setSourceCoordinates }}
        >
          <DestinationCoordinatesContext.Provider
            value={{ destinationCoordinates, setDestinationCoordinates }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="col-span-1">
                <Booking />
              </div>
              <div className="col-span-2">
                <MapBox />
              </div>
            </div>
          </DestinationCoordinatesContext.Provider>
        </SourceCoordinatesContext.Provider>
      </UseLocationContext.Provider>
    </main>
  );
}
