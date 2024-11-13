import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogout } from "../../reducer/logoutSlice";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import ModalProfile from "./ModalProfile";
import { BsCartPlusFill } from "react-icons/bs";
import { fetchAddToCart } from "../../reducer/addToCartSlice";
import { fetchGetLoggedUser } from "../../reducer/loggedUserSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const avatarUrl = useSelector((state) => state.user?.data?.profilePictureUrl);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuProfileOpen, setMenuProfileOpen] = useState(false);

  const handleAddToCart = (item) => {
    dispatch(fetchAddToCart(item));
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchGetLoggedUser()); // Ambil data user jika sudah login
    }
  }, [isLoggedIn, dispatch]);

  const handleProfile = () => {
    setMenuProfileOpen(!menuProfileOpen);
  };

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return (
    <div className="sticky top-0 z-10 bg-white font-['Itim']">
      <div className="flex items-center justify-between p-5 text-2xl md:p-5 md:text-xl">
        {/* Logo */}
        <div className="flex items-center text-sm md:text-2xl">
          <h1 className="text-2xl font-bold text-blue-700 md:text-4xl font-edu md:font-bold">
            Holidays.In
          </h1>
        </div>

        {/* Menu Toggle Button for Mobile */}
        <div className="md:hidden">
          <button className="text-4xl " onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "×" : "≡"}
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col gap-2 py-5 absolute top-16 left-0 w-full bg-white md:flex md:flex-row md:static md:py-0 md:gap-5 md:w-auto `}
        >
          <p className="mx-auto mt-[-20px] md:mt-0 md:mx-0">About</p>
          <p className="mx-auto md:mx-0">Promo</p>
          <p className="mx-auto md:mx-0">Category</p>
          <p className="mx-auto md:mx-0">Activity</p>
          <Link to={"/cart"}>
            <BsCartPlusFill
              className="mx-auto text-blue-700 md:mx-0"
              onClick={() => handleAddToCart()}
            />
          </Link>

          {/* Login/Logout Section */}
          {isLoggedIn ? (
            <>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={handleProfile}
                />
              ) : (
                <RxAvatar
                  className="mx-auto text-3xl cursor-pointer md:mx-0"
                  onClick={handleProfile}
                />
              )}
              {menuProfileOpen && (
                <ModalProfile
                  handleLogout={handleLogout}
                  onClose={() => setMenuProfileOpen(false)}
                 
                />
              )}
            </>
          ) : (
            <Link to={"/login"}>
              <p>Login</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
