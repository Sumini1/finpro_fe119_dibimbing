import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetAllUsers = createAsyncThunk(
  "user/fetchGetAllUsers",
  async () => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      // console.error(error);
      throw error;
    }
  }
);

const AllUserSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    message: "",
    data: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchGetAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
      });
  },
});
export default AllUserSlice.reducer;
