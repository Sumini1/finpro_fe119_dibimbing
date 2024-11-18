
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Gunakan useSelector untuk mengambil data role pengguna

const ModalProfile = ({ onClose, handleLogout }) => {
  const modalRef = useRef(null);

  // Ambil role dari state pengguna
  const userRole = useSelector((state) => state.loggedUser?.data?.role);

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

      {/* Link Dashboard hanya tampil jika role adalah 'admin' */}
      {userRole === "admin" && (
        <div>
          <Link to={"/banner-user"}>
            <p className="block px-4 py-2 text-sm text-gray-700">Dashboard</p>
          </Link>
          <Link to={"/list-transactions"}>
          <p className="block px-4 py-2 text-sm text-gray-700">List Transactions</p>
          </Link>
        </div>
      )}

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
