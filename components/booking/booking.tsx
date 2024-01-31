import { useContext, useState } from "react";
import { Button } from "../ui/button";
import Address from "./address";
import Cards from "./cards";
import Cars from "./cars";
import { useRouter } from "next/navigation";
import { SelectedAmountContext } from "@/context/selected-amount";

type Props = {};

const Booking = (props: Props) => {
  const router = useRouter();
  const { selectedAmout, setSelectedAmount } = useContext(
    SelectedAmountContext
  );
  return (
    <div className="p-5">
      <Address />
      <Cars />
      <Cards />
      <Button
        className={`bg-yellow-500 text-black font-semibold text-lg w-full hover:bg-yellow-400 hover:text-black shadow-md ${
          !selectedAmout ? "bg-gray-200" : null
        }`}
        onClick={() => router.push("/payment")}
        disabled={!selectedAmout}
      >
        Book
      </Button>
    </div>
  );
};

export default Booking;
