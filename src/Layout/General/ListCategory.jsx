import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetCategories } from "../../reducer/categorySlice";
import { Link } from "react-router-dom";
import Navbar from "../../components/General/Navbar";

const ListCategory = () => {
  const dispatch = useDispatch();
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
<div>
  <Navbar />
      <div className="flex flex-col min-h-screen p-1 py-1 text-lg bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 md:p-10 ">
      <h1 className="text-white font-['Itim'] text-2xl md:text-4xl py-2 p-5">
        List Category
      </h1>
      <div className="grid grid-cols-1 gap-5 md:gap-7 p-5 text-white md:grid-cols-3">
        {data.map((category) => (
          <div key={category.id} className="flex flex-col gap-3">
            <h2 className="mb-2 text-xl">{category?.name}</h2>
            <Link to={`/category/${category.id}`}>
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-60 rounded-xl"
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-5 text-white bg-blue-700 w-[200px] rounded-full mx-auto mb-5">
        <Link to={"/"}>
          <button className="p-1">Back To Home</button>
        </Link>
      </div>
    </div>
</div>
  );
};

export default ListCategory;
