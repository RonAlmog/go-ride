import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

function Navbar() {
  return (
    <div className="flex justify-between p-3 px-10 border-b-[1px] shadow-sm">
      <div className="flex gap-10 items-center">
        <Image src="/logo.png" alt="Go Ride" width={120} height={60} />
        <div className="hidden md:flex items-center gap-6">
          <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
            Home
          </h2>
          <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
            History
          </h2>
          <h2 className="hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all">
            Help
          </h2>
        </div>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default Navbar;
