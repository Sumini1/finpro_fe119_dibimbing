import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetCategoryById } from '../../reducer/categoryByIdSlice';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';

const CategoryById = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, isLoading, message } = useSelector((state) => state.categoryById);
    useEffect(() => {
        dispatch(fetchGetCategoryById(id));
    }, [id, dispatch]); 
    return (
      <div className="min-h-screen p-5 text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
        <div className="flex flex-col mx-auto">
          <h1 className="">Category with ID: {id}</h1>
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
        <Link to={"/"}>
          <button className="bg-blue-600 w-[200px] text-center justify-center rounded-full flex mt-10">
            Back To Home
          </button>
        </Link>
      </div>
    );
};

export default CategoryById;