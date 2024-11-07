import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchUpdateBanner = createAsyncThunk(
  "updateBanner/fetchUpdateBanner",
  async ({ id, bannerData }) => {
    try {
      const accesToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${id}`,
        bannerData,
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
        title: "Banner Updated",
        icon: "success",
        text: data.message,
        showConfirmButton: true,
      });
      return data;
    } catch (error) {
      Swal.fire({
        title: "Banner Update Failed",
        text: error?.response?.data?.message || error.message,
        icon: "error",
        showConfirmButton: true,
      });
      console.error(error);
    }
  }
);

const updateBannerSlice = createSlice({
  name: "updateBanner",
  initialState: {
    status: "idle",
    message: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdateBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(fetchUpdateBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default updateBannerSlice.reducer;
