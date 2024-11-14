import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivity } from "../../reducer/activitySlice";
import ModalCreateActivity from "../../components/Activities/ModalCreateActivity";
import ModalUpdateActivity from "../../components/Activities/ModalUpdateActivity";
import { fetchDeleteActivity } from "../../reducer/deleteActivitySlice";
import Swal from "sweetalert2";
import { MdCreate } from "react-icons/md";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const ActivitiesAdmin = () => {
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.activity);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateActivityOpen, setIsModalUpdateActivityOpen] =
    useState(false);
  const [updateActivity, setUpdateActivity] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 10;

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter data berdasarkan query pencarian
  const filteredActivity = data.filter((activity) =>
    activity.title
      ? activity.title.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

  // Data untuk halaman saat ini
  const indexOfLastActivity = currentPage * activitiesPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage;
  const currentActivities = filteredActivity.slice(indexOfFirstActivity, indexOfLastActivity);

  // Total halaman
  const totalPages = Math.ceil(filteredActivity.length / activitiesPerPage);

  // Fungsi untuk berpindah halaman
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDeleteActivity = (id) => {
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
        dispatch(fetchDeleteActivity(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleUpdateActivity = (activity = null) => {
    setUpdateActivity(activity);
    setIsModalUpdateActivityOpen(!isModalUpdateActivityOpen);
  };

  const toggleModalCreate = () => {
    setIsModalCreateOpen(!isModalCreateOpen);
  };

  useEffect(() => {
    dispatch(fetchActivity());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>Error: {message}</div>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="py-4 font-['Roboto Condensed'] text-md  md:text-xl mx-5">
        Halaman Activities
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
          onClick={() => toggleModalCreate()}
          className="flex items-end order-1 w-full gap-2 mx-5 mt-0 mb-5 mr-10 rounded-md text-end md:order-2 md:mt-3"
        >
          <button className="flex items-center ">Create</button>
          <MdCreate className="relative top-[-5px]" />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs font-bold uppercase bg-gradient-to-tr from-blue-800 via-blue-700 to-blue-800">
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
            {currentActivities.map((activity, index) => (
              <tr
                key={activity.id}
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
                  {activity.title}
                </th>
                <td className="px-6 py-4">{activity.createdAt}</td>
                <td className="px-6 py-4">{activity.updatedAt}</td>
                <td className="flex gap-4 px-6 py-4">
                  <Link to={`/detail-activity/${activity.id}`}>
                    <button className="font-medium text-white hover:underline">
                      Detail
                    </button>
                  </Link>
                  <button
                    className="font-medium text-white hover:underline"
                    onClick={() => handleUpdateActivity(activity)}
                  >
                    Update
                  </button>
                  <button
                    className="font-medium text-white hover:underline"
                    onClick={() => handleDeleteActivity(activity.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls with Arrows */}
      <div className="flex justify-center mt-5">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`mx-2 px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Previous
        </button>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`mx-2 px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-3 gap-5 p-5">
        {isModalCreateOpen && (
          <ModalCreateActivity
            isModalOpen={isModalCreateOpen}
            toggleModal={toggleModalCreate}
          />
        )}
        {isModalUpdateActivityOpen && (
          <ModalUpdateActivity
            isModalOpen={isModalUpdateActivityOpen}
            toggleModal={handleUpdateActivity}
            activity={updateActivity}
            activityId={updateActivity?.id}
          />
        )}
      </div>
    </div>
  );
};

export default ActivitiesAdmin;
