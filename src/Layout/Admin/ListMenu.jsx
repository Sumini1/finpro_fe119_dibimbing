import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { PiFlagBannerFoldBold } from "react-icons/pi";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { LuActivity } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import Sidebar from "./Sidebar";

const ListMenu = ({closeSidebar}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) =>
    location.pathname === path ? "bg-blue-800" : "text-white";

  return (
    <div className="h-full px-3 py-4 overflow-y-auto bg-gradient-to-tr from-blue-800 via-blue-700 to-blue-800">
      <div className="mb-4 text-right">
        <button onClick={closeSidebar} className="text-xl font-bold text-white md:hidden">
          X
        </button>
      </div>
      <ul className="space-y-2 font-medium">
        <li>
          <Link
            to="/banner-user"
            onClick={closeSidebar}
            className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
              "#"
            )}`}
          >
            <MdDashboard className="text-lg md:text-xl" />
            <span className="text-lg ms-3 md:text-xl">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/banner-user"
            onClick={closeSidebar}
            className={`flex items-center text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
              "/banner-user"
            )}`}
          >
            <PiFlagBannerFoldBold className="text-lg md:text-2xl" />
            <span className="flex-1 text-lg ms-3 whitespace-nowrap md:text-xl">
              Banner
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/promo-admin"
            onClick={closeSidebar}
            className={`flex text-white items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
              "/promo-admin"
            )}`}
          >
            <RiDiscountPercentFill className="text-lg md:text-2xl" />
            <span className="flex-1 text-lg ms-3 whitespace-nowrap md:text-xl">
              Promo
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/category-admin"
            onClick={closeSidebar}
            className={`flex items-center p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
              "/category-admin"
            )}`}
          >
            <MdCategory className="text-lg md:text-2xl" />
            <span className="flex-1 text-lg ms-3 whitespace-nowrap md:text-xl">
              Category
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/activities-admin"
            onClick={closeSidebar}
            className={`flex items-center p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
              "/activities-admin"
            )}`}
          >
            <LuActivity className="text-lg md:text-2xl" />
            <span className="flex-1 text-lg ms-3 whitespace-nowrap md:text-xl">
              Activities
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/transaction-table"
            className={`flex items-center p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
              "/transaction-table"
            )}`}
          >
            <GrTransaction className="text-lg md:text-2xl" />
            <span className="flex-1 text-lg ms-3 whitespace-nowrap md:text-xl">
              Transaction
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/alluser"
            onClick={closeSidebar}
            className={`flex items-center p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ${isActive(
              "/alluser"
            )}`}
          >
            <FaUsers className="text-lg md:text-2xl" />
            <span className="flex-1 text-lg ms-3 whitespace-nowrap md:text-xl">
              Users
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/"
            onClick={closeSidebar}
            className="flex items-center p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <IoHome className="text-lg md:text-xl" />
            <span className="flex-1 text-lg ms-3 whitespace-nowrap md:text-xl">
              Back to Home
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ListMenu;
