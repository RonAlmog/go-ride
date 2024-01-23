"use client";
import { getPaymentMethods } from "@/data/cardslist";
import React, { useState } from "react";
import Image from "next/image";

type Props = {};

const Cards = (props: Props) => {
  const paymentMethods = getPaymentMethods();
  const [selectedCard, setSelectedCard] = useState<any>();
  return (
    <div>
      <h2 className="font-semibold">Payment Method</h2>
      <div className="grid grid-cols-5 p-2">
        {paymentMethods.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedCard(index)}
            className={`m-2 p-2 border rounded-md hover:border-yellow-400 cursor-pointer hover:scale-110 transition-all ${
              index === selectedCard ? "border-yellow-400 border-2" : ""
            }`}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={50}
              className="w-20"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
