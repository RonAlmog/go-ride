"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from "uuid";

const MAPBOX_RETRIEVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";
const sessionToken = uuidv4();
type Props = {};

const Address = (props: Props) => {
  const [source, setSource] = useState("");
  const [sourceChange, setSourceChange] = useState(false);
  const [destination, setDestination] = useState("");
  const [destinationChange, setDestinationChange] = useState(false);
  const [addressList, setAddressList] = useState<any>(null);
  const [sourceCoordinates, setSourceCoordinates] = useState<any>([]);
  const [destinationCoordinates, setDestinationCoordinates] = useState<any>([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getAddressList();
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [source, destination]);
  const getAddressList = async () => {
    const query = sourceChange
      ? source
      : destinationChange
      ? destination
      : null;
    const res = await fetch(`/api/search-address?q=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const results = await res.json();
    setAddressList(results);
  };

  const onSourceAddressClick = async (item: any) => {
    setSource(item.full_address);
    setSourceChange(false);
    setAddressList([]);
    // fetch address from mapbox
    const res = await fetch(
      `${MAPBOX_RETRIEVE_URL}${item.mapbox_id}?session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    const result = await res.json();
    console.log("source:", result);
    setSourceCoordinates({
      lon: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  const onDestinationAddressClick = async (item: any) => {
    setDestination(item.full_address);
    setDestinationChange(false);
    setAddressList([]);
    // fetch address from mapbox
    const res = await fetch(
      `${MAPBOX_RETRIEVE_URL}${item.mapbox_id}?session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    const result = await res.json();
    console.log("destination:", result);
    setDestinationCoordinates({
      lon: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-semibold">Booking</h2>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <label className="text-gray-500">Where from?</label>
          <Input
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setSourceChange(true);
            }}
          />

          {addressList?.suggestions && sourceChange ? (
            <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
              {addressList?.suggestions.map((item: any, index: number) => (
                <h2
                  key={index}
                  onClick={() => onSourceAddressClick(item)}
                  className="p-3 hover:bg-gray-300 cursor-pointer"
                >
                  {item.full_address}
                </h2>
              ))}
            </div>
          ) : null}
        </div>
        <div className="relative mt-3">
          <label className="text-gray-500">Where to?</label>
          <Input
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setDestinationChange(true);
            }}
          />

          {addressList?.suggestions && destinationChange ? (
            <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
              {addressList?.suggestions.map((item: any, index: number) => (
                <h2
                  key={index}
                  onClick={() => onDestinationAddressClick(item)}
                  className="p-3 hover:bg-gray-300 cursor-pointer"
                >
                  {item.full_address}
                </h2>
              ))}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default Address;
