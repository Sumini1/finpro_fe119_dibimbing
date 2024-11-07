import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios";

export const fetchUpdatePromo = createAsyncThunk(
    "updatePromo/fetchUpdatePromo",
    async ({ id, promoData }) => {
        try {
            const accesToken = localStorage.getItem("accessToken");
            const response = await axios.post(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${id}`,
                promoData,
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
                title: "Promo Updated",
                icon: "success",
                text: data.message,
                showConfirmButton: true,
            });
            return data;
        } catch (error) {
            // console.error(error);
            Swal.fire({
                title: "Update Promo Failed",
                icon: "error",
                text: error.message,
                showConfirmButton: true,
            })
            return error;
        } 
    }
);

const updatePromoSlice = createSlice({
    name : 'updatePromo',
    initialState : {
        status : "idle",
        message: "",
        error : null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
        .addCase(fetchUpdatePromo.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchUpdatePromo.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.message = action.payload.message;
        })
        .addCase(fetchUpdatePromo.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    }
})
    
export default updatePromoSlice.reducer