import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetPromos } from "../../reducer/promoSlice";
import ModalUpdatePromo from "../../components/Promo/ModalUpdatePromo";
import ModalCreatePromo from "../../components/Promo/ModalCreatePromo";
import { fetchDeletePromo } from "../../reducer/deletePromoSlice";
import Swal from "sweetalert2";

const PromoAdmin = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.promo);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);


  const handleDeletePromo = (id) => {
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
          dispatch(fetchDeletePromo(id)).then(() => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            dispatch(fetchGetPromos());
          });
        }
      })
      .catch(() => {
        Swal.fire("Delete failed", "Failed to delete promo.", "error");
      });
  };

  // Fungsi untuk membuka modal create
  const handleOpenCreateModal = () => {
    setIsModalCreateOpen(true); // buka modal create
  };

  // Fungsi untuk membuka modal update
  const handleOpenUpdateModal = (promo) => {
    setSelectedPromo(promo); // set promo yang akan diupdate
    setIsModalUpdateOpen(true); // buka modal update
  };

  // Fungsi untuk menutup modal create dan update
  const handleCloseModal = () => {
    setIsModalCreateOpen(false);
    setIsModalUpdateOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    dispatch(fetchGetPromos());
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="py-5 font-['Roboto Condensed'] text-md">Halaman Promo</h1>
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
            {data.map((promo) => (
              <tr
                key={promo.id}
                className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {promo.title}
                </th>
                <td className="px-6 py-4">{promo.createdAt}</td>
                <td className="px-6 py-4">{promo.updatedAt}</td>
                <td className="flex gap-4 px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={handleOpenCreateModal}
                  >
                    Create
                  </button>
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleOpenUpdateModal(promo)}
                  >
                    Update
                  </button>
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleDeletePromo(promo.id)}
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
        {/* Modal untuk Create Promo */}
        {isModalCreateOpen && (
          <ModalCreatePromo
            isModalOpen={isModalCreateOpen}
            toggleModal={handleCloseModal}
          />
        )}

        {/* Modal untuk Update Promo */}
        {isModalUpdateOpen && selectedPromo && (
          <ModalUpdatePromo
            isModalOpen={isModalUpdateOpen}
            toggleModal={handleCloseModal}
            promo={selectedPromo}
            promoId={selectedPromo?.id}
          />
        )}
      </div>
    </div>
  );
};

export default PromoAdmin;
