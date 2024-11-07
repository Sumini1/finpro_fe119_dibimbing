import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetCategoryById = createAsyncThunk(
  "category/fetchGetCategoryById",
  async (id) => {
    try {
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${id}`,
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

const categoryByIdSlice = createSlice({
  name: "categoryById",
  initialState: {
    status: "idle",
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetCategoryById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetCategoryById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(fetchGetCategoryById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categoryByIdSlice.reducer;
