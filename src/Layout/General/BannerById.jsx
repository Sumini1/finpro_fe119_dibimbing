import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetBannerById } from "../../reducer/bannerIdSlice";
import {Link} from 'react-router-dom';
import Navbar from '../../components/General/Navbar'; 
import Footer from '../../components/General/Footer';

const BannerById = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.bannerId);

  useEffect(() => {
    dispatch(fetchGetBannerById(id));
  }, [dispatch, id]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-5  bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
        <div className="flex flex-col py-5 md:mx-10  text-lg text-white md:text-xl">
          <h1 className="text-xl md:text-3xl mb-2 md:mb-5">Detail Banner</h1>
          <h1>Banner Id : {id}</h1>
          {data ? (
            <div className="flex flex-col  md:w-[500px]  rounded-lg">
              <h2 className="mb-5">Title : {data.name}</h2>
              <img
                src={data.imageUrl}
                alt={data.title}
                className="w-full h-auto rounded-lg md:w-[500px]"
              />
              <div className="flex flex-col gap-2 mt-5">
                <Link to={"/"}>
                  <button className="w-[150px] mt-1 mb-5 bg-blue-700 rounded-full md:w-[200px] flex items-center text-center justify-center p-1">
                    Back to Home
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <p>No promo found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BannerById;
