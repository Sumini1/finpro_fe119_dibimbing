import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetAllUsers } from "../../reducer/allUserSlice";
import ModalUserUpdate from "../../components/Users/ModalUserUpdate";
import ModalUpdateUserRole from "../../components/Users/ModalUpdateUserRole";

const AllUser = () => {
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.AllUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRoleOpen, setIsModalRoleOpen] = useState(false);
  const [dataModalSelected, setDataModalSelected] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRole = (role = null) => {
    setIsModalRoleOpen(!isModalRoleOpen);
    setSelectedRole(role);
  };

  const toggleModal = (user = null) => {
    setIsModalOpen(!isModalOpen);
    setDataModalSelected(user);
  };

  useEffect(() => {
    if (!isModalOpen) {
      dispatch(fetchGetAllUsers());
    }
  }, [dispatch, isModalOpen]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>Error: {message}</div>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="py-5 font-['Roboto Condensed'] text-md">Halaman Users</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr
                key={user.id}
                className="border-b odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.name}
                </th>
                <td className="px-6 py-4">{user?.email}</td>
                <td className="px-6 py-4">{user?.role}</td>
                <td className="flex gap-4 px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => toggleModal(user)}
                  >
                    Update
                  </button>
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleRole(user)}
                  >
                    Update Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-3 gap-5 p-5">
        {isModalOpen && (
          <ModalUserUpdate
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            user={dataModalSelected}
          />
        )}

        {isModalRoleOpen && (
          <ModalUpdateUserRole
            isModalRoleOpen={isModalRoleOpen}
            handleRole={handleRole}
            role={selectedRole?.role}
            userId={selectedRole?.id}
          />
        )}
      </div>
    </div>
  );
};

export default AllUser;
