import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";

export const fetchPaymentMethod = createAsyncThunk(
    "paymentMethod/fetchPaymentMethod",
    async () => {
        try {
            const response = await fetch(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                    },
                }
            );
            const data = await response.json();
            return data;
        } catch (error) {
            // console.error(error);
            throw error;
        }
    }
);

const paymentMethodSlice = createSlice({
    name: "paymentMethod",
    initialState: {
        status: "idle",
        error: null,
        data: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentMethod.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPaymentMethod.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data;
            })
            .addCase(fetchPaymentMethod.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
})

export default paymentMethodSlice.reducer
