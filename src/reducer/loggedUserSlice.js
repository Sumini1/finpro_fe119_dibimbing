// import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

// export const fetchGetLoggedUser = createAsyncThunk(
//     "user/fetchGetLoggedUser",
//     async () => {
//         try {
//             const response = await fetch(
//                 "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
//                 {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//                         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//                     },
//                 }
//             );
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             // console.error(error);
//             throw error;
//         }
//     }
// );

// const loggedUserSlice = createSlice({
//   name: "user",
//   initialState: {
//     isLoading: false,
//     message: "",
//     data: null,
    
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchGetLoggedUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchGetLoggedUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.data = action.payload.data;
//       })
//       .addCase(fetchGetLoggedUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.message = action.error.message;
//       });
//   },
// });

// export default loggedUserSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGetLoggedUser = createAsyncThunk(
  "user/fetchGetLoggedUser",
  async () => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
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
      throw error;
    }
  }
);

const loggedUserSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    message: "",
    data: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetLoggedUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetLoggedUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchGetLoggedUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error.message;
      });
  },
});

export default loggedUserSlice.reducer;
