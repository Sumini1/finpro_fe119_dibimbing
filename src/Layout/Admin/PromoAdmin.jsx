import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetPromos } from "../../reducer/promoSlice";
import ModalUpdatePromo from "../../components/Promo/ModalUpdatePromo";
import ModalCreatePromo from "../../components/Promo/ModalCreatePromo";
import { fetchDeletePromo } from "../../reducer/deletePromoSlice";
import Swal from "sweetalert2";
import { MdCreate } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const PromoAdmin = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.promo);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (event) => {
      setSearchQuery(event.target.value);
    };
    // Filter data berdasarkan query pencarian
    const filteredPromo = data.filter((promo) =>
      promo.title
        ? promo.title.toLowerCase().includes(searchQuery.toLowerCase())
        : false
    );


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
        }b
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
      <h1 className="py-5 font-['Roboto Condensed'] text-md md:text-xl mx-5">Halaman Promo</h1>
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
          onClick={() => handleOpenCreateModal()}
          className="flex items-end order-1 w-full gap-2 mx-5 mt-0 mb-5 mr-10 rounded-md text-end md:order-2 md:mt-3"
        >
          <button className="flex items-center ">Create</button>
          <MdCreate className="relative top-[-5px]" />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left ]">
          <thead className="text-xs font-bold text-white uppercase bg-gradient-to-tr from-blue-800 via-blue-700 to-blue-800 ">
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
            {filteredPromo.map((promo, index) => (
              <tr
                key={promo.id}
                className={` ${
                  index % 2 === 0
                    ? "bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 text-white"
                    : "bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 text-white"
                }`}
              >
                <th scope="row" className="px-6 py-4 font-medium text-white">
                  {index + 1}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-white">
                  {promo.title}
                </th>
                <td className="px-6 py-4">{promo.createdAt}</td>
                <td className="px-6 py-4">{promo.updatedAt}</td>
                <td className="flex gap-4 px-6 py-4">
                  <Link to={`/detail-promo/${promo.id}`}>
                    <button className="font-medium text-white hover:underline">
                      Detail
                    </button>
                  </Link>
                  <button
                    className="font-medium text-white hover:underline"
                    onClick={() => handleOpenUpdateModal(promo)}
                  >
                    Update
                  </button>
                  <button
                    className="font-medium text-white hover:underline"
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
