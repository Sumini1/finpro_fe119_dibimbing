import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivity } from "../../reducer/activitySlice";
import { IoStar } from "react-icons/io5";
import{Link} from "react-router-dom"
import { MdReviews } from "react-icons/md";

const Activity = () => {
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.activity);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchActivity());
  }, [dispatch]);

  // Autoplay logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data.length]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (message) {
    return <div>Error: {message}</div>;
  }

  // Fungsi untuk memformat angka menjadi IDR
  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div className="p-5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 md:p-20 md:mt-[-40px] min-h-screen ">
      <div className=" text-2xl text-white md:text-2xl md:mb-5">
        <h2>Bosen ? </h2>
        <p className="md:mb-10 mb-8">Cobain Aktivitas ini yuk..</p>
      </div>
      <div className="flex overflow-x-auto space-x-7">
        {data.map((activity, index) => (
          <Link to={`/activity/${activity.id}`}>
            <button
              key={activity?.id}
              className="flex-shrink-0 mb-5 w-[100px] h-[40px] text-white bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 items-center text-center rounded-full text-sm md:mb-5"
            >
              {activity?.category?.name}
            </button>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 overflow-x-auto md:grid-cols-4 ">
        {data
          .slice(currentIndex, currentIndex + (window.innerWidth < 768 ? 1 : 4))
          .map((activity, index) => (
            <div
              key={activity?.id}
              className="flex-shrink-0 transition-opacity duration-700 ease-in-out shadow-lg bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 rounded-md"
            >
              <div className="relative gap-3">
                <img
                  src={activity?.imageUrls[0]}
                  alt={activity?.title}
                  className="w-full h-[300px] rounded-lg"
                />
                <div className="flex flex-col mx-3 mt-2">
                  <h2 className="text-md text-white ">{activity?.title}</h2>

                  <p className="absolute flex gap-2 px-2  mx-2 text-xl text-yellow-400 bg-blue-600 bg-opacity-50 rounded-xl top-5 md:text-2xl">
                    <IoStar />
                    {activity?.rating}
                  </p>
                  <p className=" text-md text-white flex gap-2 ">
                    <MdReviews className="mt-1" />

                    {activity?.total_reviews}
                  </p>
                  <p className=" text-md text-white ">
                    {`Price : ${formatToIDR(activity.price)}`}
                  </p>
                  <p className=" text-md text-white mb-5">
                    {`Discount: ${formatToIDR(activity.price_discount)}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Activity;




