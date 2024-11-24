import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGetCategoryById } from '../../reducer/categoryByIdSlice';
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Navbar from '../../components/General/Navbar'; 
import Footer from '../../components/General/Footer';

const CategoryById = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, isLoading, message } = useSelector((state) => state.categoryById);
    useEffect(() => {
        dispatch(fetchGetCategoryById(id));
    }, [id, dispatch]); 
    return (
  <div>
  <Navbar />
        <div className="min-h-screen p-5 text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 ">
        <div className="flex flex-col mx-auto md:mx-5">
          <h1 className='text-xl md:text-3xl mb-2 md:mb-5'>Detail Category</h1>
          <h1 className="text-md md:text-xl">Id : {id}</h1>
          {isLoading && <p>Loading...</p>}
          {message && <p>Error: {message}</p>}
          {data ? (
            <>
              <h2 className="mb-5 text-md md:text-xl">Name : {data.name}</h2>
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
          <button className="bg-blue-700 w-[150px] text-center justify-center rounded-full flex mt-7 p-1 md:mx-5 ">
            Back To Home
          </button>
        </Link>
      </div>
      <Footer />
</div>
    );
};

export default CategoryById;