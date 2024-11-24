import React, { useEffect } from "react";
import { ImFacebook2 } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { ImTwitter } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentMethod } from "../../reducer/paymentMethodSlice";



const Footer = () => {
  const dispatch = useDispatch();
  const {data} = useSelector((state) => state.paymentMethod);

  useEffect(() => {
    dispatch(fetchPaymentMethod());
  }, [dispatch]);
  return (
    <div className="flex flex-col py-10 md:flex md:flex-row md:gap-20">
      <div className="flex flex-col gap-3 text-lg ">
        <div className="flex flex-col items-center mx-auto mb-3 md:mx-24">
          <h1 className="mb-5 text-xl font-bold text-blue-700 font-edu">
            Holidays.In
          </h1>
          <p className="mb-1 font-bold">
            PT <span className="text-sm font-bold font-edu"> Holidays.In</span>{" "}
            Indonesia
          </p>
          <p className="w-full md:w-[400px] p-2">
            Plaza CityView Lantai 2 Jl. Kemang Timur No.1, RT.14/RW.8, Pejaten
            Bar., Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota
            Jakarta 12510
          </p>
        </div>
        {/* icons */}
        <div className="flex gap-7 mx-auto mb-5 text-2xl text-blue-700 mt-[-10px]">
          <ImFacebook2 />
          <FaInstagram />
          <FaLinkedin />
          <ImTwitter />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex md:flex-row md:gap-10">
        <div className="flex flex-col mx-auto">
          <h1 className="text-xl font-bold ">Metode Pembayaran yang tersedia</h1>
          <div className="flex flex-row gap-5 items-center justify-center ">
            {data.map((method) => (
              <div key={method.id}>
                <img
                  src={method.imageUrl}
                  alt={method.name}
                  className="w-[60px] h-[60px]"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col mb-3 mx-3">
          <h1 className="text-xl font-bold ">Promo</h1>
          <p>Hotel</p>
          <p>Kereta</p>
          <p>Pesawat</p>
          <p>Tiket</p>
        </div>
        <div className="flex flex-col mx-3">
          <h1 className="text-xl font-bold ">Category</h1>
          <p>Hotel</p>
          <p>Kereta</p>
          <p>Pesawat</p>
          <p>Tiket</p>
        </div>
        <div className="flex flex-col mx-3">
          <h1 className="text-xl font-bold">Activity</h1>
          <p>Bali</p>
          <p>Jakarta</p>
          <p>Bandung</p>
          <p>Lombok</p>
          <p>Bajo</p>
          <p>Bromo</p>
        </div>
      </div>
      <hr className="block text-xl font-bold text-gray-500 mt-10 " />
      <div className="flex flex-col  mx-auto md:flex-col mt-5 md:ml-[-800px] md:pt-64">
        {" "}
        &copy; 2024 Holidays.In All rights reserved
      </div>
    </div>
  );
};

export default Footer;
