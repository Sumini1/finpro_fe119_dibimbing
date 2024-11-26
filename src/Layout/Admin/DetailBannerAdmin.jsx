import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetBannerById } from "../../reducer/bannerIdSlice";
import { Link } from "react-router-dom";
import Navbar from "../../components/General/Navbar";
const DetailBannerAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.bannerId);

  useEffect(() => {
    dispatch(fetchGetBannerById(id));
  }, [dispatch, id]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-5 py-10 bg-blue-500">
        <h1 className="mb-5  md:mb-5 text-2xl md:text-3xl font-bold text-white md:mx-10">Detail Banner Admin Page</h1>
        <div className="grid text-white">
          {data ? (
            <div className="flex flex-col rounded-xl text-md md:gap-5  md:w-[500px]  shadow-lg md:mx-10 bg-blue-600">
              <div className="">
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  className="w-full h-auto rounded-lg mb-5 md:mb-0  md:w-[500px]"
                />
              </div>
              <div className="w-full mx-1 text-md  md:text-[18px]">
                <h2 className="mx-3  ">
                  {`Title : ${data.name}`}
                </h2>
                <p className="mx-3 ">{`Id : ${data?.id}`}</p>
                <p className="mx-3 "> {`Created At : ${data.createdAt}`}</p>
                <p className="mx-3 mb-4 md:mb-10 ">
                  {`Updated At : ${data.updatedAt}`}{" "}
                </p>
                <Link to={"/banner-user"}>
                  <button className="w-[170px] md:w-[200px] p-2 mx-3 bg-blue-700 rounded-full mb-3 md:text-lg">
                    Back To Dashboard
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailBannerAdmin;
