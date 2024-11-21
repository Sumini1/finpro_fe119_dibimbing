import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetLoggedUser } from "../../../reducer/loggedUserSlice";
import ModalUserUpdate from "../../../components/Users/ModalUserUpdate";
import Navbar from "../../../components/General/Navbar";
import Footer from "../../../components/General/Footer";

const LoggedUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedUser.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModalSelected, setDataModalSelected] = useState(null);

  const toggleModal = (user = null) => {
    setIsModalOpen(!isModalOpen);
    setDataModalSelected(user);
  };

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(fetchGetLoggedUser());
    }
  }, [dispatch, isModalOpen]);

  useEffect(() => {
    
  },[]);


  return (
    <div>
      <Navbar />
      <div className="text-white p-5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 min-h-screen">
        <div className="flex flex-col md:mx-20 items-center  justify-center">
          <h1 className="flex py-5 text-2xl md:text-3xl md:mb-5">My Account</h1>
          <img
            src={user?.profilePictureUrl}
            alt={user?.name}
            className="w-40 h-40 rounded-full md:w-56 md:h-56 md:mb-5"
          />
          <div className="flex flex-col items-center mt-5 text-xl md:justify-start md:items-start md:text-xl ">
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
          </div>
          <button
            onClick={() => toggleModal(user)}
            className="w-[150px] mb-5 bg-blue-700 rounded-full md:w-[200px]  items-center text-center justify-center p-1 text-white mt-5 "
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
      </div>
      <Footer />
    </div>
  );
};

export default LoggedUser;
