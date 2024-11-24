import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetAllUsers } from "../../reducer/allUserSlice";
import ModalUpdateUserRole from "../../components/Users/ModalUpdateUserRole";
import { CiSearch } from "react-icons/ci";


const AllUser = () => {
  const dispatch = useDispatch();
  const { data, isLoading, message } = useSelector((state) => state.AllUser);
  const [isModalRoleOpen, setIsModalRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    dispatch(fetchGetAllUsers());
  }, [dispatch]);

  const handleRole = (role = null) => {
    setIsModalRoleOpen(!isModalRoleOpen);
    setSelectedRole(role);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>Error: {message}</div>;
  }

  // Filter data berdasarkan query pencarian
  const filteredUsers = data.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Data untuk halaman saat ini
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Total halaman
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Fungsi untuk berpindah halaman
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="py-5 font-['Roboto Condensed'] text-md md:text-xl">
        Halaman Users
      </h1>

      <div className="flex items-center  p-3 mb-5 rounded-full bg-slate-100 md:rounded-full md:w-[500px] md:mb-3 md:gap-3 gap-5">
        <CiSearch />
        <input
          type="text"
          placeholder="Cari berdasarkan nama user..."
          value={searchQuery}
          onChange={handleInputChange}
          // onKeyPress={handleKeyPress} // Trigger search on Enter
          className="w-64 py-0 text-black rounded-full outline-none bg-slate-100"
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left ">
          <thead className="text-xs text-white uppercase bg-gradient-to-tr from-blue-800 via-blue-700 to-blue-800">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
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
            {currentUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0
                    ? "bg-gradient-to-tr from-blue-900 via-blue-700 to-blue-900 text-white"
                    : "bg-gradient-to-tr from-blue-800 via-blue-600 to-blue-800 text-white"
                }`}
              >
                <th scope="row" className="px-6 py-4 font-medium text-white">
                  {(currentPage - 1) * usersPerPage + index + 1}
                </th>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="flex gap-4 px-6 py-4">
                  <button
                    className="font-medium text-white hover:underline"
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

      {/* Modal for Update User Role */}
      <div className="grid grid-cols-3 gap-5 p-5">
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
