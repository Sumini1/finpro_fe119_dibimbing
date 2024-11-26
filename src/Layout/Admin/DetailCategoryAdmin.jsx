import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetCategoryById } from "../../reducer/categoryByIdSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/General/Navbar";
import Footer from "../../components/General/Footer";

const DetailCategoryAdmin = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector(
    (state) => state.categoryById
  );
  useEffect(() => {
    dispatch(fetchGetCategoryById(id));
  }, [id, dispatch]);
  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-5 text-white bg-blue-500 py-10">
        <h1 className="mb-5  md:mb-7 text-2xl md:text-3xl font-bold md:mx-10">Detail Category Admin Page</h1>
        <div className="flex flex-col mx-auto text-md  md:mx-10 md:mt-5 ">
          {isLoading && <p>Loading...</p>}
          {message && <p>Error: {message}</p>}
          <div className="flex flex-col w-full md:w-[500px] rounded-md shadow-lg bg-blue-600">
            {data ? (
              <>
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  className="rounded-md md:w-[500px]"
                />
                <h1 className="mx-5 mt-5">Category Id : {id}</h1>
                <h2 className=" mx-5">Name : {data.name}</h2>
                <p className="mx-5">Created At : {data.createdAt}</p>
                <p className="mx-5 mb-5"> Updated At : {data.updatedAt}</p>
              </>
            ) : (
              <p>No category found.</p>
            )}
            <Link to={"/category-admin"}>
              <button className="bg-blue-500 w-[170px] text-md text-center justify-center rounded-full flex mt-4 mx-5 p-1 md:w-[180px] mb-5">
                Back To Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailCategoryAdmin;
