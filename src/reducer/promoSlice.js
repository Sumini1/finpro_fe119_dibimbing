import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchGetPromos = createAsyncThunk(
    "promo/fetchGetPromos",
    async () => {
        try {
            const response = await fetch(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
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

const promoSlice = createSlice({
    name: "promo",
    initialState: {
        status : "idle",
        error : null,
        data : [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetPromos.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGetPromos.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data;
            })
            .addCase(fetchGetPromos.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export default promoSlice.reducer