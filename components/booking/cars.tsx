"use client";
import { DirectionDataContext } from "@/context/direction-context";
import { SelectedAmountContext } from "@/context/selected-amount";
import { getCars } from "@/data/carlist";
import Image from "next/image";
import { useContext, useState } from "react";

const Cars = () => {
  const cars = getCars();
  const { directionData, setDirectionData } = useContext(DirectionDataContext);
  const [selectedCar, setSelectedCar] = useState<any>();
  const { selectedAmout, setSelectedAmount } = useContext(
    SelectedAmountContext
  );

  const getCost = (charges: any) => {
    console.log(directionData.routes[0].distance);
    console.log(directionData.routes[0].distance * 0.000621371192);
    console.log((directionData.routes[0].distance * 0.000621371192).toFixed(2));
    return (
      charges *
      directionData.routes[0].distance *
      0.000621371192
    ).toFixed(2);
  };

  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select a Car</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">
        {cars.map((car, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedCar(index);
              setSelectedAmount(getCost(car.charges));
            }}
            className={`m-2 p-2 border rounded-md hover:border-yellow-400 cursor-pointer ${
              index === selectedCar ? "border-yellow-400 border-2" : ""
            }`}
          >
            <Image
              src={car.image}
              alt={car.name}
              width={100}
              height={50}
              className="w-full"
            />
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-gray-500">{car.name}</h2>
              {directionData.routes ? (
                <span className="float-right text-black font-medium">
                  ${getCost(car.charges)}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
