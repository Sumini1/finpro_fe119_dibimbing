import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetBanners } from "../../reducer/bannerSlice";
import ModalCreateBanner from "../../components/Banner/ModalCreateBanner";
import UpdateBanner from "../../components/Banner/UpdateBanner";
import { fetchDeleteBanner } from "../../reducer/deleteBannerSlice";
import Swal from "sweetalert2";

const BannerUser = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.banner);
  const deleteStatus = useSelector((state) => state.deleteBanner.status); // Memantau status delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateBanner, setIsModalUpdateBanner] = useState(false);
  const [updateBanner, setUpdateBanner] = useState(null);

  const handleDeleteBanner = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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

  // Refresh data banners setelah delete berhasil
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
      <h1 className="py-5 font-['Roboto Condensed'] text-md">
        Halaman Banner User
      </h1>
      <button
        className="mb-4 font-medium text-blue-600 dark:text-blue-500 hover:underline"
        onClick={() => toggleModal()}
      >
        Create Banner
      </button>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
            {data.map((banner) => (
              <tr
                key={banner.id}
                className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {banner.name}
                </th>
                <td className="px-6 py-4">{banner.createdAt}</td>
                <td className="px-6 py-4">{banner.updatedAt}</td>
                <td className="flex gap-4 px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => toggleModal()}
                  >
                    Create
                  </button>
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleUpdateBanner(banner)}
                  >
                    Update
                  </button>
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
