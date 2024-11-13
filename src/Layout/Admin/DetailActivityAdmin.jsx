import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchGetActivityById } from "../../reducer/activityIdSlice";
import Navbar from "../../components/General/Navbar";

const DetailActivityAdmin = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isLoading, message } = useSelector((state) => state.activityId);

  useEffect(() => {
    dispatch(fetchGetActivityById(id));
  }, [id, dispatch]);

  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-blue-500">
      <Navbar />
      <div className="min-h-screen p-5 py-5 text-white bg-blue-500 md:p-20 md:mr-32">
        {isLoading && <p>Loading...</p>}
        {message && <p>Error: {message}</p>}
        {data ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <h3 className="mb-3 text-xl">Title: {data?.title}</h3>
            <p>{`Price : ${formatToIDR(data.price)}`}</p>
            <p>{`Price Discount : ${formatToIDR(data?.price_discount)}`}</p>
            <p>{`Rating : ${data.rating}`}</p>
            <p>{`Total Reviews : ${data?.total_reviews}`}</p>
            <p>{`Fasilitas : ${data?.facilities}`}</p>
            <p className="md:w-[400px] w-[350px]">
              {`Address : ${data?.address}`}{" "}
            </p>
            <p>{`Provinsi : ${data?.province}`}</p>
            <p>{`Kota : ${data?.city}`}</p>
            <p>{`Created At : ${data.createdAt}`}</p>
            <p>{`Updated At : ${data.updatedAt}`}</p>
            <p className="mb-3 text-lg md:w-[400px] w-[350px]">
              Description: {data.description}
            </p>

            <div className="grid">
              <div className="flex">
                {data.imageUrls && data.imageUrls.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xl">Images:</h4>
                    {data.imageUrls.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Activity Image ${index + 1}`}
                        className="w-[350px] h-[250px] rounded-lg md:w-[900px] md:h-[500px]"
                      />
                    ))}
                  </div>
                )}
              </div>

              {data.location_maps && (
                <div className="grid mt-5">
                  <h4 className="mb-2 text-xl">Location Map:</h4>
                  <div
                    dangerouslySetInnerHTML={{ __html: data.location_maps }}
                    className="w-[350px] h-[250px] border-0 overflow-hidden rounded-lg md:w-[900px] md:h-[500px]"
                  />
                </div>
              )}

              <div className="flex gap-5 p-1 mx-3 md:text-lg md:flex-row md:gap-2  md:mt-[-20px]">
                <Link to={"/"}>
                  <button className="flex justify-center items-center mt-5 bg-blue-600 w-[150px] rounded-full text-center mb-2 md:mx-6">
                    Back To Home
                  </button>
                </Link>
                <Link to={"/add-to-cart"}>
                  <button className="flex justify-center items-center mt-5 bg-blue-600 w-[150px] rounded-full text-center mb-2 md:mx-6">
                    Add To Cart
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p>No activity found.</p>
        )}
      </div>
    </div>
  );
};

export default DetailActivityAdmin;
