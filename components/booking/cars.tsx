"use client";
import { getCars } from "@/data/carlist";
import Image from "next/image";
import { useState } from "react";

type Props = {};

const Cars = (props: Props) => {
  const cars = getCars();
  const [selectedCar, setSelectedCar] = useState<any>();
  return (
    <div className="mt-3">
      <h2 className="font-semibold">Select a Car</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2">
        {cars.map((car, index) => (
          <div
            key={index}
            onClick={() => setSelectedCar(index)}
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
              <span className="float-right text-black font-medium">
                ${car.charges * 8}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
