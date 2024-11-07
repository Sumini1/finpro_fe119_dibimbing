import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchDeleteCategory = createAsyncThunk(
    "deleteCategory/fetchDeleteCategory",
    async (id) => {
        try {
            const accesToken = localStorage.getItem("accessToken");
            const response = await axios.delete(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${id}`,
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
                title: "Category Deleted",
                icon: "success",
                text: data.message,
                showConfirmButton: true,
            });
            return data;
        } catch (error) {
            // console.error(error);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: error.message,
                showConfirmButton: true,
            })
            throw error;
        }
    }
);

const deleteCategorySlice = createSlice({
    name: "deleteCategory",
    initialState: {
       isLoading : false,
       message : "",
       error : null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeleteCategory.pending, (state) => {
                state.isLoading = true;
                state.message = "";
            })
            .addCase(fetchDeleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
            })
            .addCase(fetchDeleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.message = action.payload || "Error deleting category";
            });
    },
});

export default deleteCategorySlice.reducer;
