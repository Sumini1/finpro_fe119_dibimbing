import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchDeleteBanner = createAsyncThunk(
  "deleteBanner/fetchDeleteBanner",
  async (id) => {
    try {
      const accesToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accesToken}`,
          },
        }
      );
      const data = response.data;
      if (data.code !== "200") {
        throw new Error(data.message);
      }
      Swal.fire({
        title: "Banner Deleted",
        text: "Banner has been deleted",
        icon: "success",
        showConfirmButton: true,
        timer: 2000,
      });
      return data;
    } catch (error) {
      // console.log(error);
      Swal.fire({
        title: "Delete Failed",
        text: "Failed to delete banner",
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const deleteBannerSlice = createSlice({
  name: "deleteBanner",
  initialState: {
    isLoading: false,
    message: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeleteBanner.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(fetchDeleteBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(fetchDeleteBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload || "Error deleting banner";
      });
  },
});

export default deleteBannerSlice.reducer;

// export const {} = deleteBannerSlice.actions;    