import React from "react";
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 flex justify-between p-5 py-5 font-['Roboto Condensed'] font-medium text-gray-600 bg-white cursor-pointer">
      <div className="flex text-sm md:text-lg">
        <h1>Jelajah Wisata</h1>
      </div>
      <div className="flex text-sm md:text-lg gap-7">
        <p>About</p>
        <p>Promo</p>
        <p>Activity</p>
        <p>Login</p>
        <RxAvatar className="text-3xl" />
      </div>
    </div>
  );
};

export default Navbar;
