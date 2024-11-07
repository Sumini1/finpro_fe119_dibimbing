import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetBannerById } from "../../reducer/bannerIdSlice";
const BannerById = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.bannerId);

  useEffect(() => {
    dispatch(fetchGetBannerById(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>Banner with ID: {id}</h1>
      {isLoading && <p>Loading...</p>}
      {message && <p>Error: {message}</p>}
      {data ? (
        <>
          <h2>Nama : {data.name}</h2>
          <img src={data.imageUrl} alt={data.name} />
        </>
      ) : (
        <p>No banner found.</p>
      )}
    </div>
  );
};

export default BannerById;
