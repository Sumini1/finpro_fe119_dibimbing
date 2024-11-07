
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchUpdateUser = createAsyncThunk(
  "updateUser/fetchUpdateUser",
  async (userData) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = response.data;

      if (data.code !== "200") {
        throw new Error(data.message);
      }

      Swal.fire({
        title: "Update Successfully",
        icon: "success",
        text: data.message,
        showConfirmButton: true,
      });
      return data;
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        icon: "error",
        text: error.response?.data?.message || error.message,
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const updateUserSlice = createSlice({
  name: "updateUser",
  initialState: {
    status: "idle",
    error: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default updateUserSlice.reducer;
