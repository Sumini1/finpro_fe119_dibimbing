import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetCategoryById } from "../../reducer/categoryByIdSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/General/Navbar";

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
      <div className="min-h-screen p-5 text-white bg-blue-500">
        <div className="flex flex-col mx-auto text-md md:text-xl md:mx-10 md:mt-5">
          <h1 className="">Category Id : {id}</h1>
          {isLoading && <p>Loading...</p>}
          {message && <p>Error: {message}</p>}
          {data ? (
            <>
              <h2 className="mb-5">Name : {data.name}</h2>
              <img
                src={data.imageUrl}
                alt={data.name}
                className="rounded-md md:w-[500px]"
              />
            </>
          ) : (
            <p>No category found.</p>
          )}
        </div>
        <Link to={"/category-admin"}>
          <button className="bg-blue-600 w-[170px] text-center justify-center rounded-full flex mt-10 md:mx-10 p-2">
            Back To Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DetailCategoryAdmin;
