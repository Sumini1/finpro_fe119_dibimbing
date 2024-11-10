import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchGetActivityById } from "../../reducer/activityIdSlice";

const ActivityId = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isLoading, message } = useSelector((state) => state.activityId);

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
    <div className="min-h-screen p-10 text-white bg-blue-500">
      <h1 className="text-xl">Activity with ID: {id}</h1>
      {isLoading && <p>Loading...</p>}
      {message && <p>Error: {message}</p>}
      {data ? (
        <>
          {/* <h2>Category Name: {data.category.name}</h2>
          <img src={data.category.imageUrl} alt={data.category.name} /> */}
          <h3 className="mb-3 text-xl">Title: {data.title}</h3>
          <p>{`Price : ${formatToIDR(data.price)}`}</p>
          <p className="mb-3 text-lg">Description: {data.description}</p>
          {data.imageUrls && data.imageUrls.length > 0 && (
            <div>
              <h4 className="mb-2 text-xl">Images:</h4>
              {data.imageUrls.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Activity Image ${index + 1}`}
                  className="w-full h-full rounded-lg md:w-[500px]"
                />
              ))}
              <div className="flex flex-col items-center justify-center mx-auto md:text-lg md:flex-row md:gap-2 md:mx-6">
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
          )}
        </>
      ) : (
        <p>No activity found.</p>
      )}
    </div>
  );
};

export default ActivityId;
