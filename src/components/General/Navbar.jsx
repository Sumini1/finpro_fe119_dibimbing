import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogout } from "../../reducer/logoutSlice";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import ModalProfile from "./ModalProfile";
import { BsCartPlusFill } from "react-icons/bs";
import { fetchCart } from "../../reducer/cartSlice";
import { fetchGetLoggedUser } from "../../reducer/loggedUserSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const avatarUrl = useSelector(
    (state) => state.loggedUser?.data?.profilePictureUrl
  );
  const userRole = useSelector((state) => state.loggedUser?.data?.role);
  const { cartItems } = useSelector((state) => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuProfileOpen, setMenuProfileOpen] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart());
      dispatch(fetchGetLoggedUser());
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
      <div className="flex items-center justify-between p-5 mx-auto text-2xl md:p-5 md:text-xl">
        {/* Logo */}
        <div className="flex items-center text-sm md:text-2xl">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold text-blue-700 md:text-4xl font-edu md:font-bold md:mx-5">
              Holidays.In
            </h1>
          </Link>
        </div>

        {/* Menu Toggle Button for Mobile */}
        <div className="md:hidden">
          <button
            className="text-2xl md:text-4xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } flex-col gap-1 py-5 absolute top-16 left-0 w-full bg-white md:flex md:flex-row md:static md:py-0 md:gap-5 md:w-auto text-[20px] md:text-xl `}
        >
          <div className="flex flex-col md:flex-row md:gap-5 mx-auto items-center">
            <Link to={"/faq"}>
              <p className="mx-auto mt-[-20px] md:mt-0 md:mx-0 ">About</p>
            </Link>
            <Link to={"/promo"}>
              <p className="mx-auto md:mx-0">Promo</p>
            </Link>
            <Link to={"/category"}>
              <p className="mx-auto md:mx-0">Category</p>
            </Link>
            <Link to={"/activity"}>
              <p className="mx-auto md:mx-0">Activity</p>
            </Link>
          </div>

          {/* Tampilkan keranjang hanya jika yang login adalah user */}
          {isLoggedIn && userRole === "user" && (
            <Link to={"/cart"} className="relative">
              <BsCartPlusFill className="mx-auto text-blue-700 md:mx-0 md:mt-1" />

              {/* Cart item count */}
              {cartItems.length > 0 && (
                <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full bg-rose-700 right-44 top-[-7px] md:-top-1 md:-right-1">
                  {cartItems.reduce((acc, item) => acc + item.quantity || 0, 0)}
                </div>
              )}
            </Link>
          )}
          {/* Login/Logout Section */}
          {isLoggedIn ? (
            <>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className="mx-auto text-3xl rounded-full cursor-pointer md:mx-0 w-[30px] h-[30px]"
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
              <div className="flex items-center justify-center mt-1">
                <p className="flex justify-center items-center p-1 md:p-2  -mt-1 text-sm font-semibold text-center text-white bg-blue-600 mx-auto rounded-full font-edu w-[70px] h-[32px]">
                  Login
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
