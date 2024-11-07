import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivity } from "../../reducer/activitySlice";
import { Link } from "react-router-dom";

const Activity = () => {
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.activity);

  useEffect(() => {
    dispatch(fetchActivity());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (message) {
    return <div>Error: {message}</div>;
  }
  return (
    <div>
      <h1>Halaman Activity</h1>
      {data.map((activity) => (
        <div key={activity.id}>
          <h2>{activity.category?.name}</h2>
          <Link to={`/activity/${activity.id}`}>
            <img
              src={activity.category?.imageUrl}
              alt={activity.category?.name}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Activity;
