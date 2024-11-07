import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";


export const fetchGetCategories = createAsyncThunk(
    "category/fetchGetCategories",
    async () => {
        try {
            const response = await fetch(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
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

const categorySlice = createSlice({
    name: "category",
    initialState: {
        status: "idle",
        error: null,
        data: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGetCategories.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data;
            })
            .addCase(fetchGetCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;