import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetBannerById } from "../../reducer/bannerIdSlice";
import { Link } from "react-router-dom";
const DetailBannerAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.bannerId);

  useEffect(() => {
    dispatch(fetchGetBannerById(id));
  }, [dispatch, id]);

  return (
    <div className="min-h-screen p-5 py-10 bg-blue-500">
      <div className="grid text-white">
        {data ? (
          <div className="items-center justify-center shadow-lg">
            <div className="grid w-full grid-cols-1 p-3 text-sm md:grid-cols-2 md:gap-5 md:text-md">
              <div className="">
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="w-full mx-1 text-sm md:mt-10 md:text-lg">
                <h2 className="mx-3 mt-4 mb-2 md:text-xl">{data.name}</h2>
                <p className="mx-3 ">{`Id : ${data?.id}`}</p>
                <p className="mx-3 "> {`Created At : ${data.createdAt}`}</p>
                <p className="mx-3 mb-4 md:mb-10 ">
                  {`Updated At : ${data.updatedAt}`}{" "}
                </p>
                <Link to={"/banner-user"}>
                  <button className="w-[200px] p-1 mx-3 bg-blue-600 rounded-full mb-3 md:text-lg">
                    Back To Dashboard
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default DetailBannerAdmin;
