import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ModalProfile = ({ onClose, handleLogout }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg cursor-pointer ring-1 ring-black ring-opacity-5 focus:outline-none"
    >
      <Link to={"/logged-user"}>
        <p className="block px-4 py-2 text-sm text-gray-700">My Account</p>
      </Link>
      <p className="block px-4 py-2 text-sm text-gray-700">My Transaction</p>
      <p className="block px-4 py-2 text-sm text-gray-700">Settings</p>
      <Link to={"banner-user"}>
        <p className="block px-4 py-2 text-sm text-gray-700">Dashboard</p>
      </Link>
      <p
        className="block px-4 py-2 text-sm text-gray-700"
        onClick={handleLogout}
      >
        Logout
      </p>
    </div>
  );
};

export default ModalProfile;
