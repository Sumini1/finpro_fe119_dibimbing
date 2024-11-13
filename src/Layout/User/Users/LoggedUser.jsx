import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetLoggedUser } from "../../../reducer/loggedUserSlice";
import ModalUserUpdate from "../../../components/Users/ModalUserUpdate";

const LoggedUser = () => {
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.loggedUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModalSelected, setDataModalSelected] = useState(null);

  const toggleModal = (data = null) => {
    setIsModalOpen(!isModalOpen);
    setDataModalSelected(data);
  };

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(fetchGetLoggedUser());
    }
  }, [dispatch, isModalOpen]);

  useEffect(() => {
    
  },[]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>Error: {message}</div>;
  }
  return (
    <div className="flex flex-col items-center justify-center py-5 md:justify-start md:items-start md:mx-6 md:text-center md:p-10 ">
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
      <button
        onClick={() => toggleModal(data)}
        className="w-[150px] mb-5 bg-blue-600 rounded-full md:w-[200px]  items-center text-center justify-center p-1 text-white mt-5 "
      >
        Edit Account
      </button>
      {isModalOpen && (
        <ModalUserUpdate
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          user={dataModalSelected}
        />
      )}
    </div>
  );
};

export default LoggedUser;
