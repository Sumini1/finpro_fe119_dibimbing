import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchDeletePromo = createAsyncThunk(
  "deletePromo/fetchDeletePromo",
  async (id) => {
    try {
      const accesToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${id}`,
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
        title: "Promo Deleted",
        text: "Promo has been deleted",
        icon: "success",
        showConfirmButton: true,
        timer: 2000,
      });
      return data;
    } catch (error) {
      Swal.fire({
        title: "Delete Failed",
        text: error.message,
        icon: "error",
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const deletePromoSlice = createSlice({
  name: "deletePromo",
  initialState: {
    isLoading: false,
    message: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeletePromo.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(fetchDeletePromo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(fetchDeletePromo.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload || "Error deleting promo";
      });
  },
});

export default deletePromoSlice.reducer;
