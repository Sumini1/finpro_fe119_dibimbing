import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

// Thunk untuk proses registrasi pengguna
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
      console.log("Response", data);

      if (data.code !== "200") {
        throw new Error(data.message);
      }
      Swal.fire({
        title: "Register Successfully",
        icon: "success",
        text: data.message,
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      console.log("Error pada try catch", error);
      Swal.fire({
        title: "Register Failed",
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
    avatarUrl: localStorage.getItem("avatarUrl") || "",
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

        // Mengambil avatar URL dari respons dan menyimpannya di localStorage
        const avatarUrl =
          action.payload.data?.avatarUrl ||
          action.payload.data?.user?.avatarUrl;
        if (avatarUrl) {
          state.avatarUrl = avatarUrl;
          localStorage.setItem("avatarUrl", avatarUrl);
        } else {
          console.error("Avatar URL tidak ditemukan pada payload.");
        }
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        state.avatarUrl = "";
      });
  },
});

export default registerSlice.reducer;
