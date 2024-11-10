import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoggedOut } from "./loginSlice";

export const fetchLogout = createAsyncThunk(
  "logout/fetchLogout",
  async (_, { dispatch }) => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();
      dispatch(setLoggedOut()); // Panggil setLoggedOut setelah logout berhasil
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default logoutSlice.reducer;
