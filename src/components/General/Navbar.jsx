import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogout } from "../../reducer/logoutSlice";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import ModalProfile from "./ModalProfile";
import { BsCartPlusFill } from "react-icons/bs";

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const avatarUrl = useSelector((state) => state.register.avatarUrl);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuProfileOpen, setMenuProfileOpen] = useState(false);

  useEffect(() => {
    console.log("Avatar URL:", avatarUrl); 
  }, [avatarUrl]);

  const handleProfile = () => {
    setMenuProfileOpen(!menuProfileOpen);
  };

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return (
    <div className="sticky top-0 z-10 bg-white font-['Itim']">
      <div className="flex justify-between p-10 py-5 text-2xl md:text-xl">
        {/* Logo */}
        <div className="flex text-sm md:text-2xl">
          <h1 className="hidden text-xl md:block md:text-4xl">
            Jelajah Wisata
          </h1>
        </div>

        {/* Menu Toggle Button for Mobile */}
        <div className="flex flex-col items-center md:hidden">
          <button
            className="text-3xl mt-[-10px] text-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`flex mt-[10px] gap-5 md:flex ${
            menuOpen
              ? "flex-col justify-center items-center py-5 mx-auto"
              : "hidden"
          } md:flex-row`}
        >
          <p>About</p>
          <p>Promo</p>
          <p>Category</p>
          <p>Activity</p>
          <BsCartPlusFill />

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
                  className="text-3xl cursor-pointer"
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
