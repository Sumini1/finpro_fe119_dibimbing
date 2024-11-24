import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { ImTwitter } from "react-icons/im";



const Footer = () => {
  return (
    <div className="flex flex-col py-10 mx-5 md:flex md:flex-row md:gap-20">
      <div className="flex flex-col gap-3 text-lg ">
        <div className="flex flex-col items-center mx-auto mb-3 md:mx-36">
          <h1 className="mb-5 text-xl font-bold text-blue-700 font-edu">
            Holidays.In
          </h1>
          <p className="mb-3 font-bold">
            PT <span className="text-sm font-bold font-edu"> Holidays.In</span>{" "}
            Indonesia
          </p>
          <p className="w-full md:w-[300px]">
            Plaza CityView Lantai 2 Jl. Kemang Timur No.1, RT.14/RW.8, Pejaten
            Bar., Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota
            Jakarta 12510
          </p>
        </div>
        {/* icons */}
        <div className="flex gap-10 mx-auto mb-5 text-2xl text-blue-700">
          <ImFacebook2 />
          <FaInstagram />
          <FaLinkedin />
          <ImTwitter />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex md:flex-row md:gap-20">
        <div className="flex flex-col mb-3">
          <h1 className="text-xl font-bold ">Perusahaan</h1>
          <p>Blog</p>
          <p>Karier</p>
          <p>Korporasi</p>
          <p>Perlindungan</p>
          <p>Cicilan</p>
          <p>FAQ</p>
        </div>
        <div className="flex flex-col mb-3">
          <h1 className="text-xl font-bold ">Promo</h1>
          <p>Hotel</p>
          <p>Kereta</p>
          <p>Pesawat</p>
          <p>Tiket</p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold ">Category</h1>
          <p>Hotel</p>
          <p>Kereta</p>
          <p>Pesawat</p>
          <p>Tiket</p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Activity</h1>
          <p>Bali</p>
          <p>Jakarta</p>
          <p>Bandung</p>
          <p>Lombok</p>
          <p>Bajo</p>
          <p>Bromo</p>
        </div>
      </div>
      <hr className="block text-xl font-bold text-gray-500 mt-7 " />
      <div className="flex flex-col  mx-auto md:flex-col mt-5 md:ml-[-800px] md:pt-64">
        {" "}
        &copy; 2024 Holidays.In All rights reserved
      </div>
    </div>
  );
};

export default Footer;
