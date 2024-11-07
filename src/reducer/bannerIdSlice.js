import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetBannerById = createAsyncThunk(
  "banner/fetchGetBannerById",
  async (id) => {
    try {
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      const data = await response.json();
      return data; 
    } catch (error) {
      // console.error("Fetch error:", error);
      throw error;
    }
  }
);

const bannerIdSlice = createSlice({
  name: "bannerId",
  initialState: {
    isLoading: false,
    message: "",
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetBannerById.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(fetchGetBannerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchGetBannerById.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload || "Error fetching banner";
      });
  },
});

export default bannerIdSlice.reducer;
