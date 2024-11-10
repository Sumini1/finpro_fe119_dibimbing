import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivity } from "../../reducer/activitySlice";
import ModalCreateActivity from "../../components/Activities/ModalCreateActivity";
import ModalUpdateActivity from "../../components/Activities/ModalUpdateActivity";
import { fetchDeleteActivity } from "../../reducer/deleteActivitySlice";
import Swal from "sweetalert2";

const ActivitiesAdmin = () => {
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.activity);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalUpdateActivityOpen, setIsModalUpdateActivityOpen] =
    useState(false);
  const [updateActivity, setUpdateActivity] = useState(null);

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
      <h1 className="py-5 font-['Roboto Condensed'] text-md">
        Halaman Activities
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
            {data.map((activity) => (
              <tr
                key={activity.id}
                className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {activity.title}
                </th>
                <td className="px-6 py-4">{activity.createdAt}</td>
                <td className="px-6 py-4">{activity.updatedAt}</td>
                <td className="flex gap-4 px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => toggleModalCreate()}
                  >
                    Create
                  </button>
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleUpdateActivity(activity)}
                  >
                    Update
                  </button>
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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
