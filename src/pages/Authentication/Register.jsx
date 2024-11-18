import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRegister } from "../../reducer/registerSlice";
import { Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registerStatus = useSelector((state) => state.register);
  console.log(registerStatus);
  const [showPassword, setShowPassword] = useState(false);

  const [fileImage, setFileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    role: "",
    phoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    try {
      if (!fileImage) {
        throw new Error("Please select an image file.");
      }

      const imageData = new FormData();
      imageData.append("image", fileImage);

      const imageUploadResponse = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        imageData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": "multipart/form-data",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const profilePictureUrl = imageUploadResponse.data.url;

      const userData = {
        ...formData,
        profilePictureUrl,
      };

      dispatch(fetchRegister(userData))
        .unwrap()
        .then(() => {
          navigate("/login");
        });
    } catch (error) {
      setErrorMessage("Error during registration: " + error.message);
      console.error(error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row text-[#34364A]">
      <div
        id="Banner"
        className="md:w-7/12 w-full bg-[url('login.jpeg')] bg-cover text-white flex flex-col justify-between font-sans"
      >
        <div className="px-8 pt-8 text-white font-edu">
          <h2 className="text-2xl font-bold">TRAVELLING</h2>
        </div>
        <div className="bg-gradient-to-t from-black pl-8 pb-8 md:pr-[25%] text-white font-edu">
          <p className="text-2xl md:text-4xl mb-4 md:mb-6 font-medium leading-tight md:leading-[75px] tracking-wide">
            TIME TO TRAVEL THE WORLD
          </p>
          <p className="text-sm md:text-md ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
            dignissimos nam optio eius delectus possimus nostrum dolores amet
            maiores corporis!
          </p>
        </div>
      </div>
      <div
        id="FormSection"
        className="flex flex-col w-full px-4 py-8 md:w-5/12 md:py-7"
      >
        <h1 className="mb-8 text-2xl font-bold text-center md:text-3xl">
          <span className="text-lg md:text-xl md:py-5">Register Now!</span>
          <br />
          Join Our Adventure
        </h1>
        <div
          id="Forms"
          className="flex flex-col justify-start w-full text-center gap-y-6"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 font-medium text-left md:p-8"
          >
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {/* Name */}
            <div className="flex items-center gap-4 mb-4">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md hover:border-black focus:border-black"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md hover:border-black focus:border-black"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded-md hover:border-black focus:border-black"
                  placeholder="Enter your password"
                  required
                />
                <i
                  className="material-icons absolute top-[33%] right-[15px] cursor-pointer"
                  style={{ fontSize: "16px" }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </i>
              </div>
            </div>

            {/* Repeat Password */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="passwordRepeat"
                  name="passwordRepeat"
                  value={formData.passwordRepeat}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-400 rounded-md hover:border-black focus:border-black"
                  placeholder="Repeat your password"
                  required
                />
                <i
                  className="material-icons absolute top-[33%] right-[15px] cursor-pointer"
                  style={{ fontSize: "16px" }}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </i>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-4 mb-4">
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md hover:border-black focus:border-black"
                placeholder="Enter your role"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-4 mb-4">
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-400 rounded-md hover:border-black focus:border-black"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Profile Picture */}
            <div className="flex items-center gap-4 mb-4">
              <input
                type="file"
                id="profilePicture"
                onChange={(e) => setFileImage(e.target.files[0])}
                className="w-full p-2 border border-gray-400 rounded-md hover:border-black focus:border-black"
                required
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-700 rounded-md"
            >
              Register
            </button>
          </form>
          <div className="flex flex-col gap-2 mb-2">
            <p className="flex flex-row items-center justify-center gap-3 text-sm md:text-md">
              Already have an account?
              <Link to="/login" className="text-blue-700 underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
