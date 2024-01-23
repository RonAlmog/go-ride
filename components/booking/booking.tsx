import Address from "./address";
import Cars from "./cars";

type Props = {};

const Booking = (props: Props) => {
  return (
    <div className="p-5">
      <Address />
      <Cars />
    </div>
  );
};

export default Booking;
