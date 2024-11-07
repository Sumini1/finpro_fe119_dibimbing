import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchUpdateUserRole } from "../../reducer/updateUserRoleSlice";
import { fetchGetAllUsers } from "../../reducer/allUserSlice";

const ModalUpdateUserRole = ({ handleRole, isModalRoleOpen, userId, role}) => {
  // tambahkan userId sebagai props
  const dispatch = useDispatch();
  const updateUserRoleStatus = useSelector((state) => state.updateUserRole);
  const [form, setForm] = useState({ role: role || "" });

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    
    dispatch(fetchUpdateUserRole({ id: userId, userData: form }))
      .then(() => {
        dispatch(fetchGetAllUsers());
        Swal.fire("Role updated!", "User role has been updated.", "success");
        handleRole(); // Tutup modal setelah sukses
      })
      .catch(() => {
        Swal.fire("Update failed", "Failed to update user role.", "error");
      });
  };

  if (!isModalRoleOpen) return null;

  return (
    <div
      id="progress-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-50"
    >
      <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-2.5 mb-4 bg-gray-50 border rounded-lg"
              required
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-5 py-2 text-white bg-blue-700 rounded-lg"
              >
                Update Role
              </button>
              <button
                type="button"
                onClick={handleRole}
                className="px-5 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdateUserRole;
