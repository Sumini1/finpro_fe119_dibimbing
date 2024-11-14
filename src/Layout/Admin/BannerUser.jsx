import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetBanners } from "../../reducer/bannerSlice";
import ModalCreateBanner from "../../components/Banner/ModalCreateBanner";
import UpdateBanner from "../../components/Banner/UpdateBanner";
import { fetchDeleteBanner } from "../../reducer/deleteBannerSlice";
import { MdCreate } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const BannerUser = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.banner);
  const deleteStatus = useSelector((state) => state.deleteBanner.status); // Memantau status delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateBanner, setIsModalUpdateBanner] = useState(false);
  const [updateBanner, setUpdateBanner] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");


  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  // Filter data berdasarkan query pencarian
  const filteredBanner = data.filter((banner) =>
    banner.name
      ? banner.name.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

  const handleDeleteBanner = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this banner?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(fetchDeleteBanner(id)).then(() => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            dispatch(fetchGetBanners());
          });
        }
      })
      .catch(() => {
        Swal.fire("Delete failed", "Failed to delete banner.", "error");
      });
  };

  const handleUpdateBanner = (banner = null) => {
    setIsModalUpdateBanner(!isModalUpdateBanner);
    setUpdateBanner(banner);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(fetchGetBanners());
  }, [dispatch]);
  
  useEffect(() => {
    if (deleteStatus === "succeeded") {
      dispatch(fetchGetBanners());
    }
  }, [dispatch, deleteStatus]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="py-5 font-['Roboto Condensed'] text-md md:text-xl mx-5">
        Halaman Banner Admin
      </h1>

      <div className="grid grid-cols-1 p-2 mb-2 rounded-full md:grid-cols-2 md:rounded-lg md:items-center">
        <div className="flex w-full gap-2 p-2 mb-2 rounded-full bg-slate-100 md:mt-[5px] order-2 md:order-1">
          <CiSearch className="mx-5 mt-1" />
          <input
            type="text"
            placeholder="Cari berdasarkan nama..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-64 py-0 text-black rounded-full outline-none bg-slate-100"
          />
        </div>
        <div
          onClick={() => toggleModal()}
          className="flex items-end order-1 w-full gap-2 mx-5 mt-0 mb-5 mr-10 rounded-md text-end md:order-2 md:mt-3"
        >
          <button className="flex items-center ">Create</button>
          <MdCreate className="relative top-[-5px]" />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-white ">
          <thead className="text-xs font-bold text-white uppercase bg-gradient-to-tr from-blue-800 via-blue-700 to-blue-800">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBanner.map((banner, index) => (
              <tr
                key={banner.id}
                className={` ${
                  index % 2 === 0
                    ? "bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900"
                    : "bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900"
                }`}
              >
                <th>
                  <p className="px-6 py-4">{index + 1}</p>
                </th>

                <th scope="row" className="px-6 py-4 font-medium text-white ">
                  {banner.name}
                </th>
                <td className="px-6 py-4">{banner.createdAt}</td>
                <td className="px-6 py-4">{banner.updatedAt}</td>
                <td className="flex gap-4 px-6 py-4">
                  <Link to={`/detail-banner/${banner.id}`}>
                    <button className="font-medium text-white hover:underline">
                      Detail
                    </button>
                  </Link>
                  <button
                    className="font-medium text-white hover:underline"
                    onClick={() => handleUpdateBanner(banner)}
                  >
                    Update
                  </button>
                  <button
                    className="font-medium text-white hover:underline"
                    onClick={() => handleDeleteBanner(banner.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-3 gap-5 p-5">
        {isModalOpen && (
          <ModalCreateBanner
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
          />
        )}

        {isModalUpdateBanner && (
          <UpdateBanner
            isModalOpen={isModalUpdateBanner}
            toggleModal={handleUpdateBanner}
            bannerId={updateBanner?.id}
            banner={updateBanner}
          />
        )}
      </div>
    </div>
  );
};

export default BannerUser;
