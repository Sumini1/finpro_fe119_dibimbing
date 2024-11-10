import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetLoggedUser } from "../../../reducer/loggedUserSlice";


const LoggedUser = () => {
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.loggedUser);

  useEffect(() => {
    dispatch(fetchGetLoggedUser());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>Error: {message}</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center py-5 md:justify-start md:items-start md:mx-6 md:text-center md:p-10">
      <h1 className="flex py-5 text-2xl md:text-3xl">My Account</h1>
      <img
        src={data.profilePictureUrl}
        alt={data.name}
        className="w-40 h-40 rounded-full md:w-56 md:h-56"
      />
      <div className="flex flex-col items-center mt-5 text-xl md:justify-start md:items-start md:text-xl">
        <p>Name: {data.name}</p>
        <p>Email: {data.email}</p>
        <p>Role: {data.role}</p>
      </div>
      <button className="w-[150px] mb-5 bg-blue-600 rounded-full md:w-[300px] flex mx-auto items-center text-center justify-center p-1 text-white mt-5">Edit Account</button>
    </div>
  );
};

export default LoggedUser;
