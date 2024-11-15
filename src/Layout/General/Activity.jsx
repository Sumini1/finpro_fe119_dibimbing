import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivity } from "../../reducer/activitySlice";
import { IoStar } from "react-icons/io5";

import{Link} from "react-router-dom"

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

  return (
    <div className="p-5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 md:p-20 md:mt-[-40px]">
      <div className="mb-5 text-2xl text-white md:text-2xl md:mb-5">
        <h2>Bosen ? </h2>
        <p className="md:mb-10">Cobain Aktivitas ini yuk..</p>
      </div>
      <div className="flex overflow-x-auto space-x-7">
        {data.map((activity, index) => (
          <Link to={`/activity/${activity.id}`}>
            <button
              key={activity?.id}
              className="flex-shrink-0 w-[100px] h-[40px] text-white bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 items-center text-center rounded-full text-sm md:mb-5"
            >
              {activity?.category?.name}
            </button>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 overflow-x-auto md:grid-cols-4">
        {data
          .slice(currentIndex, currentIndex + (window.innerWidth < 768 ? 1 : 4))
          .map((activity, index) => (
            <div
              key={activity?.id}
              className="flex-shrink-0 py-5 transition-opacity duration-700 ease-in-out"
            >
              <h2 className="mb-3 text-lg text-white md:text-xl">
                {activity?.title}
              </h2>
              <div className="relative gap-3">
                <img
                  src={activity?.imageUrls[0]}
                  alt={activity?.title}
                  className="w-full h-[300px] rounded-lg"
                />

                <p className="absolute flex gap-2 px-2 py-2 mx-2 text-xl text-yellow-400 bg-blue-600 bg-opacity-50 rounded-xl top-5 md:text-2xl">
                  <IoStar />
                  {activity?.rating}
                </p>
                <p className="mt-2 text-lg text-white md:text-xl">{`Reviews : ${activity?.total_reviews}`}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Activity;




