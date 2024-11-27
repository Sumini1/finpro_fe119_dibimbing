import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchDeleteActivity = createAsyncThunk(
  "deleteActivity/fetchDeleteActivity",
  async (id, { rejectWithValue }) => {
    try {
      const accesToken = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${id}`,
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
        title: "Activity Deleted",
        text: "Activity has been successfully deleted.",
        icon: "success",
        showConfirmButton: true,
        timer: 2000,
      });

      return data;
    } catch (error) {
      let errorMessage = "Failed to delete activity.";
      if (error.response && error.response.data) {
        const serverError = error.response.data;

        // Tangani error spesifik dari server
        if (serverError.errors?.includes("violates foreign key constraint")) {
          errorMessage =
            "Activity cannot be deleted because it is still referenced in carts. Please remove associated carts first.";
        } else {
          errorMessage = serverError.message;
        }
      }

      Swal.fire({
        title: "Delete Failed",
        text: errorMessage,
        icon: "error",
        showConfirmButton: true,
      });

      return rejectWithValue(errorMessage); 
    }
  }
);



const deleteActivitySlice = createSlice({
  name: "deleteActivity",
  initialState: {
    isLoading: false,
    message: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeleteActivity.pending, (state) => {
        state.isLoading = true;
        state.message = "";
        state.error = null;
      })
      .addCase(fetchDeleteActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(fetchDeleteActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.error = action.payload || "Error deleting activity";
      });
  },
});

export default deleteActivitySlice.reducer;


