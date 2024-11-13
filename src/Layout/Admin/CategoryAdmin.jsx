import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetCategories } from "../../reducer/categorySlice";
import ModalCreateCategory from "../../components/Category/ModalCreateCategory";
import ModalUpdateCategory from "../../components/Category/ModalUpdateCategory";
import { fetchDeleteCategory } from "../../reducer/deleteCategorySlice";
import Swal from "sweetalert2";
import { MdCreate } from "react-icons/md";
import { Link } from "react-router-dom";

const CategoryAdmin = () => {
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.category);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUpdateCategory, setIsModalUpdateCategory] = useState(false);
  const [updateCategory, setUpdateCategory] = useState(null);
  const deleteStatus = useSelector((state) => state.deleteCategory);
  console.log("Delete status:", deleteStatus);

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(fetchDeleteCategory(id))
          .then((response) => {
            console.log("Delete response:", response);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            dispatch(fetchGetCategories());
          })
          .catch((error) => {
            console.error("Delete error:", error);
            Swal.fire("Delete failed", "Failed to delete category.", "error");
          });
      }
    });
  };
  useEffect(() => {
    if (deleteStatus) {
      dispatch(fetchGetCategories());
    }
  }, [dispatch, deleteStatus]);

  const handleUpdateCategory = (category = null) => {
    setIsModalUpdateCategory(!isModalUpdateCategory);
    setUpdateCategory(category);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(fetchGetCategories());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>Error: {message}</div>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="py-5 font-['Roboto Condensed'] text-md">
        Halaman Category
      </h1>
      <div
        onClick={() => toggleModal()}
        className="flex items-end w-full gap-2 mb-5 mr-10 rounded-md text-end"
      >
        <button className="flex items-center">Create</button>
        <MdCreate className="relative top-[-5px]" />
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-white">
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
            {data.map((category, index) => (
              <tr
                key={category.id}
                className={` ${
                  index % 2 === 0
                    ? "bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900"
                    : "bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900"
                }`}
              >
                <th>
                  <p className="px-6 py-4">{index + 1}</p>
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-white">
                  {category.name}
                </th>
                <td className="px-6 py-4">{category.createdAt}</td>
                <td className="px-6 py-4">{category.updatedAt}</td>
                <td className="flex gap-4 px-6 py-4">
                  <Link to={`/detail-category/${category.id}`}>
                    <button className="font-medium text-white hover:underline">
                      Detail
                    </button>
                  </Link>
                  <button
                    className="font-medium text-white hover:underline"
                    onClick={() => handleUpdateCategory(category)} // Mengirim category yang dipilih
                  >
                    Update
                  </button>
                  <button
                    className="font-medium text-white hover:underline"
                    onClick={() => handleDeleteCategory(category.id)}
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
        {/* Modal untuk Create Category */}
        {isModalOpen && (
          <ModalCreateCategory
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            // handleCloseModal={handleCloseModal}
          />
        )}

        {/* Modal untuk Update Category */}
        {isModalUpdateCategory && (
          <ModalUpdateCategory
            isModalOpen={isModalUpdateCategory}
            toggleModal={handleUpdateCategory}
            categoryId={updateCategory?.id}
            category={updateCategory}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryAdmin;
