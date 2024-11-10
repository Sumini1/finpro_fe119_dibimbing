import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetBannerById } from "../../reducer/bannerIdSlice";
import {Link} from 'react-router-dom';
const BannerById = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.bannerId);

  useEffect(() => {
    dispatch(fetchGetBannerById(id));
  }, [dispatch, id]);

  return (
    <div className="min-h-screen p-10 bg-blue-500">
      <div className="flex flex-col items-center justify-center mx-auto text-lg text-white md:text-xl">
        <h1>Banner with ID: {id}</h1>
        {isLoading && <p>Loading...</p>}
        {message && <p>Error: {message}</p>}
        {data ? (
          <div className="flex flex-col shadow-lg md:w-[500px] md:mx-auto rounded-lg">
            <h2 className="mb-5">Title : {data.name}</h2>
            <img
              src={data.imageUrl}
              alt={data.title}
              className="w-full h-auto rounded-lg md:w-[500px]"
            />
            <div className="flex flex-col gap-2 mt-5">


              <Link to={"/"}>
                <button className="w-[150px] mt-1 mb-5 bg-blue-600 rounded-full md:w-[300px] flex mx-auto items-center text-center justify-center p-1">
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
  );
};

export default BannerById;
