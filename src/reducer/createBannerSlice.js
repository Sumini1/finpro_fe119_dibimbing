import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchCreateBanner = createAsyncThunk(
    "createBanner/fetchCreateBanner",
    async (bannerData) => {
        try {
            const accesToken = localStorage.getItem("accessToken");
            const response = await axios.post(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner",
                bannerData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${accesToken}`,
                    },
                    // body: JSON.stringify(bannerData),
                }
            );
            const data = await response.data;
            if (data.code !== "200") {
                throw new Error(data.message);
            }
            Swal.fire({
                title: "Create Banner Successfully",
                icon: "success",
                text: data.message,
                showConfirmButton: true,
            });
            return data;
        } catch (error) {
            // console.error(error);
            Swal.fire({
                title: "Create Banner Failed",
                text: error?.response?.data?.message ||  error.message,
                icon: "error",
                showConfirmButton: true,
            })
            throw error;
        }
    }
);

const createBannerSlice = createSlice({
    name: "createBanner",
    initialState: {
        isLoading: false,
        message: "",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCreateBanner.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCreateBanner.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
            })
            .addCase(fetchCreateBanner.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default createBannerSlice.reducer;