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
    setDataModalSelected(user)
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
    <div>
      <nav>
        
      </nav>
      
      <h1>Halaman All User</h1>
      {data.map((user) => (
        <div key={user.id} className="mb-6">
          <img src={user.profilePictureUrl} alt={user.name} className="mb-2" />
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          
          <div className="mt-4">
            <button onClick={() => toggleModal(user)} className="mb-5 bg-blue-400">
              Update
            </button>
            <button onClick={() => handleRole(user)}>Update Role</button>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <ModalUserUpdate isModalOpen={isModalOpen} toggleModal={toggleModal} user={dataModalSelected} />
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
  );
};
    
export default AllUser;
