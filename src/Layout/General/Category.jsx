import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetCategories } from "../../reducer/categorySlice";
import { Link } from "react-router-dom";
import { MdCategory } from "react-icons/md";
// import {useParams} from 'react-router-dom';

const Category = () => {
  const dispatch = useDispatch();
  // const { id } = useParams();
  const { data, isLoading, message } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchGetCategories());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (message) {
    return <div>Error: {message}</div>;
  }

  return (
    <div className="p-5 py-5 bg-blue-500 md:p-20 md:mt-[-20px]">
      <div className="flex gap-2 text-xl text-white md:text-2xl">
        <MdCategory />
        <h1>Category</h1>
      </div>
      <div className="flex flex-col text-xl text-white mx-7 md:text-2xl md:mb-5">
        <p>Intip Category Kami yuk...!!</p>
      </div>
      <div className="flex overflow-x-auto space-x-7">
        {data.map((category) => (
          <div key={category.id} className="flex-shrink-0 py-5 ">
            <h2 className="justify-center w-[130px] px-4 py-2 mb-3 text-md text-center text-white bg-blue-600 rounded-full i-tems-center whitespace-nowrap md:mb-3">
              {category.name}
            </h2>
            <Link to={`/category/${category.id}`}>
              <img
                src={category.imageUrl}
                alt={category.name}
                className="h-[300px] w-[300px] rounded-xl md:w-[400px] md:h-[400px]"
              />
            </Link>
          </div>
        ))}
      </div>
      <Link to={"/list-category"}>
        <button className="flex items-center justify-center w-[150px] mx-auto text-center text-white bg-blue-600 rounded-full p-2 md:mt-7">
          List Category
        </button>
      </Link>
    </div>
  );
};

export default Category;
