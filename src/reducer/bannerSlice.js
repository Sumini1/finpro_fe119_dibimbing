import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetBanners = createAsyncThunk(
  "banner/fetchGetBanners",
  async () => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
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

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    isLoading: false,
    message: "",
    data: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetBanners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetBanners.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload.data;
      })
      .addCase(fetchGetBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
      });
  },
});

export default bannerSlice.reducer;
