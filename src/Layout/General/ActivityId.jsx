import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchGetActivityById } from "../../reducer/activityIdSlice";
import Navbar from "../../components/General/Navbar";
import { fetchAddToCart, fetchCart } from "../../reducer/cartSlice";

const ActivityId = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isLoading, message } = useSelector((state) => state.activityId);

  const handleCart = () => {
    dispatch(fetchAddToCart(id))
      .unwrap()
      .then(() => {
        dispatch(fetchCart());
      });
  };

  useEffect(() => {
    dispatch(fetchGetActivityById(id));
  }, [id, dispatch]);

  // Fungsi untuk memformat angka menjadi IDR
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
        {/* <h1 className="text-xl">Activity with ID: {id}</h1> */}
        {isLoading && <p>Loading...</p>}
        {message && <p>Error: {message}</p>}
        {data ? (
          <div className="flex flex-col md:mx-10">
            {/* <h2>Category Name: {data.category.name}</h2>
          <img src={data.category.imageUrl} alt={data.category.name} /> */}
            <h3 className="mb-3 text-xl md:text-2xl">Title: {data.title}</h3>
            <p>{`Price : ${formatToIDR(data.price)}`}</p>
            <p>{`Price Discount : ${formatToIDR(data?.price_discount)}`}</p>
            <p className="w-full mb-3 text-lg md:w-[500px]">
              Description: {data.description}
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
                        <div className="flex gap-5 mx-4 mt-5 md:text-lg md:flex-row md:gap-2 md:mx-10">
                          <Link to={"/"}>
                            <button className="flex p-1 justify-center mt-5 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 w-[130px] rounded-full text-center mb-2 md:mx-6">
                              Back To Home
                            </button>
                          </Link>

                          <button
                            onClick={handleCart}
                            className="flex justify-center p-1  mt-5 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 w-[130px] rounded-full text-center mb-2 md:mx-6"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>No activity found.</p>
        )}
      </div>
    </div>
  );
};

export default ActivityId;
