import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (userData) => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
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
      localStorage.setItem("accessToken", data.token);

      if (data.code !== "200") {
        throw new Error(data.message);
      }
      Swal.fire({
        title: "Login Successfully",
        icon: "success",
        // text: data.message,
        showConfirmButton: true,
      });
      return data;
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        icon: "error",
        // text: error.message,
        showConfirmButton: true,
      });
    }
  }
);
const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      });
  },
});

export default loginSlice.reducer;
