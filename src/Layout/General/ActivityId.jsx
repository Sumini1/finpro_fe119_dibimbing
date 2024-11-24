import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams,  useNavigate} from "react-router-dom";
import { fetchGetActivityById } from "../../reducer/activityIdSlice";
import Navbar from "../../components/General/Navbar";
import { fetchAddToCart, fetchCart } from "../../reducer/cartSlice";
import Footer from "../../components/General/Footer";

const ActivityId = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, message } = useSelector((state) => state.activityId);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const userRole = useSelector((state) => state.loggedUser?.data?.role);

  const handleCart = () => {
   if (!  isLoggedIn) {
    navigate("/login")
   } else if (userRole === "admin") {
    navigate("/login")
   } else {
    dispatch(fetchAddToCart(data));
    dispatch(fetchCart());
   }
  };


  useEffect(() => {
    dispatch(fetchGetActivityById(id));
  }, [id, dispatch]);

  // Fungsi untuk memformat angka menjadi IDR
  const formatToIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-5  text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
        {/* <h1 className="text-xl">Activity with ID: {id}</h1> */}
        {isLoading && <p>Loading...</p>}
        {message && <p>Error: {message}</p>}

        {data ? (
          <div className="flex flex-col md:mx-10">
            {/* <h2>Category Name: {data.category.name}</h2>
          <img src={data.category.imageUrl} alt={data.category.name} /> */}

            {data.imageUrls && data.imageUrls.length > 0 && (
              <div className="flex flex-col ">
                <h1 className="text-xl font-bold md:text-2xl mb-5 md:mb-7">Halaman Detail Activity</h1>
                {data.imageUrls && data.imageUrls.length > 0 && (
                  <div className="flex  items-center md:items-start md:gap-5">
                    <div className="mb-5 md:mb-0 flex flex-col md:flex-row gap-2">
                      {/* <h4 className="mb-2 text-xl">Images:</h4> */}

                      {data.imageUrls.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Activity Image ${index + 1}`}
                          className="w-full h-full rounded-lg md:w-[300px] md:h-[250px] "
                        />
                      ))}
                      <div className="flex flex-col md:mx-5 w-full md:w-[300px] shadow-xl p-5 md:p-7 bg-blue-500 rounded-lg mt-5 md:mt-0 mx-auto">
                        <h3 className="text-lg">
                          Title: {data.title}
                        </h3>
                        <p>{`Price : ${formatToIDR(data.price)}`}</p>
                        <p>{`Price Discount : ${formatToIDR(
                          data?.price_discount
                        )}`}</p>
                        <p className="w-full text-md md:w-[250px]">
                          Description: {data.description}
                        </p>
                        <p>{`Price : ${formatToIDR(data.price)}`}</p>
                        <p>{`Discount : ${formatToIDR(data.price_discount)}`}</p>
                        <div className="flex gap-5 text-sm  md:gap-2 mt-5 ">
                          <Link to={"/"}>
                            <button className="flex p-1 justify-center  bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 w-[120px] rounded-full text-center ">
                              Back To Home
                            </button>
                          </Link>

                          <button
                            onClick={handleCart}
                            className="flex justify-center p-1 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 w-[100px] rounded-full text-center "
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* maps */}
                {data.location_maps && (
                  <div className="mt-5 ">
                    <h4 className="mb-2 text-xl">Location Map:</h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.location_maps,
                      }}
                      className="w-[350px] h-[250px] border-0 overflow-hidden rounded-lg md:w-[500px] md:h-[350px]"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>No activity found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ActivityId;
