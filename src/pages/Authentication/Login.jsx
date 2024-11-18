import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchLogin } from "../../reducer/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      setErrorMessage("");
      await dispatch(fetchLogin({ email, password })).unwrap();
      navigate("/");
    } catch (error) {
      setErrorMessage("Login failed: " + error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row text-[#34364A] font-edu">
      <div
        id="Banner"
        className="md:w-7/12 w-full bg-[url('login.jpeg')] bg-cover text-white flex flex-col justify-between font-sans"
      >
        <div className="px-8 pt-8 text-whitee font-edu">
          <h2 className="text-2xl font-bold">TRAVELLING</h2>
        </div>
        <div className="bg-gradient-to-t from-black pl-8 pb-8 md:pr-[25%] text-white font-edu">
          <p className="text-2xl md:text-4xl mb-4 md:mb-6 font-medium leading-tight md:leading-[75px] tracking-wide">
            TIME TO TRAVEL THE WORLD
          </p>
          <p className="text-sm md:text-md text-white font-edu">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
            dignissimos nam optio eius delectus possimus nostrum dolores amet
            maiores corporis!
          </p>
        </div>
      </div>
      <div
        id="FormSection"
        className="flex flex-col items-center justify-center w-full px-4 py-8 md:w-5/12 md:py-0"
      >
        <h1 className="mb-8 text-2xl font-bold text-center md:text-3xl">
          <span className="text-lg md:text-xl">Welcome Back!</span>
          <br />
          Journey Begins Here
        </h1>
        <div
          id="Forms"
          className="flex flex-col w-full text-center gap-y-6 md:w-7/12"
        >
          <form
            onSubmit={handleSubmit}
            className="text-left font-medium flex flex-col gap-[16px]"
          >
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md border-gray-400 hover:border-black focus:border-black p-[8px_10px]"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border rounded-md border-gray-400 hover:border-black focus:border-black p-[8px_10px] w-full"
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

            <button
              type="submit"
              className="text-center text-white p-[8px_10px] w-full bg-blue-700 rounded-md"
            >
              Login
            </button>
          </form>
          <div>
            <p className="flex flex-row items-center justify-center gap-3 text-sm">
              Don't have an account?
              <Link to="/register" className="text-blue-700 underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
