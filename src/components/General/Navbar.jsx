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

          {/* Tampilkan keranjang hanya jika yang login adalah user */}
          {isLoggedIn && userRole === "user" && (
            <Link to={"/cart"} className="relative ">
              <BsCartPlusFill className="mx-auto text-blue-700 md:mx-0 " />
              {cartItems.length > 0 && (
                <div className="absolute -top-2 -right-1 text-xs bg-rose-700 text-white rounded-full w-4 h-4 flex items-center justify-center">
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
              <p className="bg-blue-600 text-white p-2  text-sm font-semibold  text-center items-center rounded-full mx-auto flex -mt-1 font-edu">Login</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
