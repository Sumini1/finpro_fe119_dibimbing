import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAddToCart = createAsyncThunk(
  "cart/fetchAddToCart",
  async (id) => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            activityId : id
          }),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async () => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
);
  
export const fetchCartUpdate = createAsyncThunk(
  "cart/fetchCartUpdate",
  async ({ id, quantity }) => {
    try {
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-cart/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            quantity: quantity,
          }),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCartDelete = createAsyncThunk(
  "cart/fetchCartDelete",
  async (id) => {
    try {
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-cart/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
       
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
);



const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.cartItems.push(action.payload.data); // Add item to cartItems
      })
      .addCase(fetchAddToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload.data; 
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCartUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchCartUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCartDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchCartDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    
  },
});

export const { setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
