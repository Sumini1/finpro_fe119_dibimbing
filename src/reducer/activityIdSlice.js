import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchGetActivityById = createAsyncThunk(
    "activity/fetchGetActivityById",
    async (id) => {
        try {
            const response = await fetch(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
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

const activityIdSlice = createSlice({
    name: "activityId",
    initialState: {
        status: "idle",
        error: null,
        data: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetActivityById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGetActivityById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data;
            })
            .addCase(fetchGetActivityById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default activityIdSlice.reducer;