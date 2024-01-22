import Booking from "@/components/booking/booking";

export default function Home() {
  return (
    <main className="">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-1">
          <Booking />
        </div>
        <div className="col-span-2">map</div>
      </div>
    </main>
  );
}
