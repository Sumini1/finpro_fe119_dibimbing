import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchDeleteActivity = createAsyncThunk(
    "deleteActivity/fetchDeleteActivity",
    async (id) => {
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
                text: "Activity has been deleted",
                icon: "success",
                showConfirmButton: true,
                timer: 2000,
            });

            return data;
        } catch (error) {
            // console.error(error);
            Swal.fire({
                title: "Delete Failed",
                text: "Failed to delete activity",
                icon: "error",
                showConfirmButton: true,
            });
            throw error;
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
        })
        .addCase(fetchDeleteActivity.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
        })
        .addCase(fetchDeleteActivity.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.error.message || "Error deleting activity";
        });
    }
})
export default deleteActivitySlice.reducer  
