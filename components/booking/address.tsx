"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";

type Props = {};

const Address = (props: Props) => {
  const [source, setSource] = useState("");
  const [sourceChange, setSourceChange] = useState(false);
  const [destination, setDestination] = useState("");
  const [destinationChange, setDestinationChange] = useState(false);
  const [addressList, setAddressList] = useState<any>(null);

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
                  onClick={() => {
                    setSource(item.full_address);
                    setSourceChange(false);
                    setAddressList([]);
                  }}
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
                  onClick={() => {
                    setDestination(item.full_address);
                    setDestinationChange(false);
                    setAddressList([]);
                  }}
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
