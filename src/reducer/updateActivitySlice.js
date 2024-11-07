import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchUpdateActivity = createAsyncThunk(
  "updateActivity/fetchUpdateActivity",
  async ({ id, activityData }) => {
    try {
      const accesToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${id}`,
        activityData,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accesToken}`,
          },
        }
      );
      const data = response.data;
      if (data.code !== "200") {
        throw new Error(data.message);
      }
      Swal.fire({
        title: "Update Activity Successfully",
        icon: "success",
        text: data.message,
        showConfirmButton: true,
      });
      return data;
    } catch (error) {
      console.error(error);
      Swal.fire({
        text: error.message,
        icon: "error",
        showConfirmButton: true,
        title: "Update Activity Failed",
      });
      throw error;
    }
  }
)

const updateActivitySlice = createSlice({
    name : 'updateActivity',
    initialState : {
        status : "idle",
        message: "",
        error : null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUpdateActivity.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchUpdateActivity.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.message = action.payload.message;
        })
        .addCase(fetchUpdateActivity.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
})

export default updateActivitySlice.reducer
