import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchRegister = createAsyncThunk(
  "register/fetchRegister",
  async (userData) => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();

      if (data.code !== "200") {
        throw new Error(data.message);
      }
      Swal.fire({
        title: "register Successfully",
        icon: "success",
        text: data.message,
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      console.log("Error pada try catch", error);
      Swal.fire({
        title: "register Failed",
        icon: "error",
        text: error.message,
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export default registerSlice.reducer;
