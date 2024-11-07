import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetCategories } from "../../reducer/categorySlice";
import ModalCreateCategory from "../../components/Category/ModalCreateCategory";
import ModalUpdateCategory from "../../components/Category/ModalUpdateCategory";
import { fetchDeleteCategory } from "../../reducer/deleteCategorySlice";
import Swal from "sweetalert2";

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
            {data.map((category) => (
              <tr
                key={category.id}
                className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {category.name}
                </th>
                <td className="px-6 py-4">{category.createdAt}</td>
                <td className="px-6 py-4">{category.updatedAt}</td>
                <td className="flex gap-4 px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => toggleModal()}
                  >
                    Create
                  </button>
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleUpdateCategory(category)} // Mengirim category yang dipilih
                  >
                    Update
                  </button>
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
