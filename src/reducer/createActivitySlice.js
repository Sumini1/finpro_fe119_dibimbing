import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchCreateActivity = createAsyncThunk(
    "createActivity/fetchCreateActivity",
    async (activityData) => {
        try {
            const accesToken = localStorage.getItem("accessToken");
            const response = await axios.post(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity",
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
                title: "Create Activity Successfully",
                icon: "success",
                text: data.message,
                showConfirmButton: true,
            });
            return data;
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
            throw error;
        }
    }
);

const createActivitySlice = createSlice({
    name: "createActivity",
    initialState: {
        status: "idle",
        message: "",
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateActivity.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCreateActivity.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.message = action.payload.message;
            })
            .addCase(fetchCreateActivity.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default createActivitySlice.reducer