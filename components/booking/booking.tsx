import { Button } from "../ui/button";
import Address from "./address";
import Cards from "./cards";
import Cars from "./cars";

type Props = {};

const Booking = (props: Props) => {
  return (
    <div className="p-5">
      <Address />
      <Cars />
      <Cards />
      <Button className="bg-yellow-500 text-black font-semibold text-lg w-full hover:bg-yellow-400 hover:text-black shadow-md">
        Book
      </Button>
    </div>
  );
};

export default Booking;
