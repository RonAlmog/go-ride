"use client";
import { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { v4 as uuidv4 } from "uuid";
import { SourceCoordinatesContext } from "@/context/source-context";
import { DestinationCoordinatesContext } from "@/context/destination-context";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

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

  const [openSource, setOpenSource] = useState(false);
  const [valueSource, setValueSource] = useState("");

  const [openDestination, setOpenDestination] = useState(false);

  const { sourceCoordinates, setSourceCoordinates } = useContext(
    SourceCoordinatesContext
  );
  const { destinationCoordinates, setDestinationCoordinates } = useContext(
    DestinationCoordinatesContext
  );

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
    console.log("addressList", addressList);
  };

  const onSourceAddressClick = async (item: any) => {
    setSource(item.full_address);
    console.log("item>>", item);
    console.log("source", source);
    setSourceChange(false);
    //setAddressList([]);
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
        <label className="text-gray-500">Where from?</label>
        <Popover open={openSource} onOpenChange={setOpenSource}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openSource}
              className="w-full justify-between"
            >
              {source ? source : "Select address..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 popover-content-width-same-as-its-trigger">
            <Command>
              <CommandInput
                placeholder="From address..."
                onValueChange={(value) => {
                  setSourceChange(true);
                  setSource(value);
                }}
              />
              <CommandEmpty>No address found.</CommandEmpty>
              <CommandGroup>
                {addressList &&
                  addressList.suggestions &&
                  addressList?.suggestions.map((address: any) => (
                    <CommandItem
                      key={address.mapbox_id}
                      value={address.full_address}
                      onSelect={(currentValue) => {
                        //setSource(currentValue);
                        onSourceAddressClick(address);
                        setOpenSource(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          valueSource === address.full_address
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {address.full_address}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="relative mt-3">
          <label className="text-gray-500">Where to?</label>
          <Popover open={openDestination} onOpenChange={setOpenDestination}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openSource}
                className="w-full justify-between"
              >
                {destination ? destination : "Select address..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 popover-content-width-same-as-its-trigger">
              <Command>
                <CommandInput
                  placeholder="To address..."
                  onValueChange={(value) => {
                    setDestinationChange(true);
                    setDestination(value);
                  }}
                />
                <CommandEmpty>No address found.</CommandEmpty>
                <CommandGroup>
                  {addressList &&
                    addressList.suggestions &&
                    addressList?.suggestions.map((address: any) => (
                      <CommandItem
                        key={address.mapbox_id}
                        value={address.full_address}
                        onSelect={(currentValue) => {
                          //setSource(currentValue);
                          onDestinationAddressClick(address);
                          setOpenDestination(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            valueSource === address.full_address
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {address.full_address}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};

export default Address;
