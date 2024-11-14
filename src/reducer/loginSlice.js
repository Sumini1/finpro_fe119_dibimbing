import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",

  async (userData, { rejectWithValue }) => {
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

      if (data.code !== "200" || !data.token) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("role", data.data.role)

      Swal.fire({
        title: "Login Successfully",
        icon: "success",
        showConfirmButton: true,
      });

      return data;
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        icon: "error",
        showConfirmButton: true,
      });
      return rejectWithValue(error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    isLoggedIn: !!localStorage.getItem("accessToken"),
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isLoggedIn = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || action.error.message;
      });
  },
});

export const { setLoggedOut } = loginSlice.actions;
export default loginSlice.reducer;
