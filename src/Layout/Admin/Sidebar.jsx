import React, { useState } from "react";
import ListMenu from "./ListMenu";
import NavbarAdmin from "../../components/General/NavbarAdmin";
// import Breadcrumb from "../../components/General/Breadcrumb";

const Sidebar = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const closeSidebar = () => setSidebarVisible(false);

 

  return (
    <div>
      <button
        onClick={() => setSidebarVisible(!sidebarVisible)}
        className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg ms-3 sm:hidden hover:bg-gray-100 focus:outline-none"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800 transition-transform ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <ListMenu closeSidebar={closeSidebar} />
      </aside>

      <div className=" sm:ml-64">
        <div className=" text-white p-4 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 text-xl w-full h-full sticky top-0 z-50 hidden md:block">
          {/* <Breadcrumb paths={breadcrumbPaths} /> */}
          <NavbarAdmin />
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
