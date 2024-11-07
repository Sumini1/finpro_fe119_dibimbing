import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetPromoById } from "../../reducer/promoByIdSlice";
import { useParams } from "react-router-dom";

const promoById = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.promoById);
  useEffect(() => {
    dispatch(fetchGetPromoById(id));
  }, [id, dispatch]);
  return (
    <div>
      <h1>Promo with ID: {id}</h1>
      {isLoading && <p>Loading...</p>}
      {message && <p>Error: {message}</p>}
      {data ? (
        <>
          <h2>Title : {data.title}</h2>
          <img src={data.imageUrl} alt={data.title} />
        </>
      ) : (
        <p>No promo found.</p>
      )}
    </div>
  );
};

export default promoById;
