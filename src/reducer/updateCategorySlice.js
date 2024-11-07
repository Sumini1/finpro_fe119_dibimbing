import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchUpdateCategory = createAsyncThunk(
  "updateCategory/fetchUpdateCategory",
  async ({ id, categoryData }) => {
    try {
      const accesToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${id}`,
        categoryData,
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
        title: "Category Updated",
        icon: "success",
        text: data.message,
        showConfirmButton: true,
      });
      return data;
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: error.message,
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const updateCategorySlice = createSlice({
  name: "updateCategory",
  initialState: {
    status: "idle",
    message: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpdateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(fetchUpdateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
})

export default updateCategorySlice.reducer;
