import React, { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { fetchGetLoggedUser } from "../../reducer/loggedUserSlice";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../../reducer/searchSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const NavbarAdmin = () => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const avatarUrl = useSelector(
    (state) => state.loggedUser?.data?.profilePictureUrl
  );
  const name = useSelector((state) => state.loggedUser?.data?.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value.trim();
    dispatch(setSearchQuery(query));

    if (!query) {
      navigate("/banner-user");
    } else if (query.toLowerCase().includes("banner")) {
      navigate("/banner-user");
    } else if (query.toLowerCase().includes("category")) {
      navigate("/category-admin");
    } else if (query.toLowerCase().includes("promo")) {
      navigate("/promo-admin");
    } else if (query.toLowerCase().includes("activities")) {
      navigate("/activities-admin");
    } else if (query.toLowerCase().includes("transaction")) {
      navigate("/transaction-table");
    } else {
      navigate("/alluser");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchGetLoggedUser());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <div className="flex items-center justify-between p-2">
      <Link to={"/"}>
        <div className="text-2xl">Holidays.In</div>
      </Link>
      <div className="flex items-center">
        <div className="relative ">
          <CiSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search... Banner, Promo, dll"
            className="pl-12 p-2  border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-800"
            onChange={handleSearch}
          />
        </div>
        {isLoggedIn ? (
          <div className="flex items-center ml-4">
            <span className="text-white">{name}</span>
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-8 h-8 ml-2 rounded-full"
            />
          </div>
        ) : (
          <div className="flex items-center ml-4">
            <RxAvatar className="text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarAdmin;
