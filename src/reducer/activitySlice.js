import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchActivity = createAsyncThunk(
    "activity/fetchActivity",
    async () => {
        try {
            const response = await fetch(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
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

const activitySlice = createSlice({
    name: "activity",
    initialState: {
        status: "idle",
        error: null,
        data: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActivity.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchActivity.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload.data;
            })
            .addCase(fetchActivity.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});
export default activitySlice.reducer;