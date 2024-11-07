import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetCategories } from "../../reducer/categorySlice";
import {Link} from "react-router-dom";

const Category = () => {
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
    <div className="grid grid-cols-3 gap-5 p-5">
      {data.map((category) => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <Link to={`/category/${category.id}`}>
          <img src={category.imageUrl} alt={category.name} className="w-full h-60"/>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Category;
