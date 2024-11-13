import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAddToCart = createAsyncThunk(
  "addToCart/fetchAddToCart",
  async (data) => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
);

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState: {
    cartItems: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload.data;
    },
    addPromoToCart: (state, action) => {
      state.cartItems.push(action.payload.data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems.push(action.payload.data); // Add item to cartItems
      })
      .addCase(fetchAddToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCartItems } = addToCartSlice.actions;
export default addToCartSlice.reducer;
