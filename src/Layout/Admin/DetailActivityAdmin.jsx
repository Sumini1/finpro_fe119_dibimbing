import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchGetActivityById } from "../../reducer/activityIdSlice";
import Navbar from "../../components/General/Navbar";
import Footer from "../../components/General/Footer";

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
    <div>
      <Navbar />
      <div className="min-h-screen p-5  text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
        {isLoading && <p>Loading...</p>}
        {message && <p>Error: {message}</p>}
        <h1 className="text-2xl md:text-3xl mb-2 md:mb-5 md:mx-10">Detail Activity Admin</h1>
        {data ? (
          <div className="flex flex-col md:mx-10">
            <h3 className=" text-md ">Title: {data.title}</h3>
            <p>{`Price : ${formatToIDR(data.price)}`}</p>
            <p>{`Price Discount : ${formatToIDR(data?.price_discount)}`}</p>
            <p>{`Rating : ${data.rating}`}</p>
            <p>{`Total Review : ${data?.total_reviews}`}</p>
            <p>{`Fasilitas : ${data?.facilities}`}</p>
            <p className="w-full md:w-[500px]">{`Alamat : ${data?.address}`}</p>
            <p>{`Kota : ${data?.city}`}</p>
            <p>{`Provinsi : ${data?.province}`}</p>
            <p>{`Created At : ${data?.createdAt}`}</p>
            <p>{`Updated At : ${data?.updatedAt}`}</p>
            <p className="w-full mb-3 text-lg md:w-[500px]">
              Description: {data?.description}
            </p>

            {data.imageUrls && data.imageUrls.length > 0 && (
              <div className="flex flex-col ">
                <h4 className="mb-2 text-xl">Images:</h4>
                {data.imageUrls && data.imageUrls.length > 0 && (
                  <div className="flex flex-col items-center md:flex-row md:items-start md:gap-5">
                    <div className="mb-5 md:mb-0">
                      {/* <h4 className="mb-2 text-xl">Images:</h4> */}
                      {data.imageUrls.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Activity Image ${index + 1}`}
                          className="w-full h-full rounded-lg md:w-[500px] md:h-[350px]"
                        />
                      ))}
                    </div>

                    {data.location_maps && (
                      <div className="mt-5 md:mt-[-30px]">
                        <h4 className="mb-2 text-xl">Location Map:</h4>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data.location_maps,
                          }}
                          className="w-[350px] h-[250px] border-0 overflow-hidden rounded-lg md:w-[500px] md:h-[350px]"
                        />
                      </div>
                    )}
                  </div>
                )}
                <div className="flex gap-5  mt-5 md:text-lg md:flex-row md:gap-2">
                  <Link to={"/activities-admin"}>
                    <button className="flex p-1 justify-center mt-5 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 w-[200px] rounded-full text-center mb-2">
                      Back To Dashboard
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>No activity found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DetailActivityAdmin;
