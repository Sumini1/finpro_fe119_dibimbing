import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchCreateCategory = createAsyncThunk(
  "createCategory/fetchCreateCategory",
  async (categoryData) => {
    try {
      const accesToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category",
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
        title: "Create Category Successfully",
        icon: "success",
        text: data.message,
        showConfirmButton: true,
      });
      return data;
    } catch (error) {
      // console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
      throw error;
    }
  }
);

const createCategorySlice = createSlice({
  name: "createCategory",
  initialState: {
    isLoading: false,
    message: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCreateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(fetchCreateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default createCategorySlice.reducer;
