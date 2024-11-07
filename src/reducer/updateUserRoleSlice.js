import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const fetchUpdateUserRole = createAsyncThunk(
    "updateUserRole/fetchUpdateUserRole",
    async ({id, userData}) => {
        try {
            const response = await fetch(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify(userData),
                }
            );
            const data = await response.json();

            if (data.code !== "200") {
                throw new Error(data.message);
            }

            Swal.fire({
                title: "Update Successfully",
                icon: "success",
                text: data.message,
                showConfirmButton: true,
            });
            return data;
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Update Failed",
                icon: "error",
                text: error.message,
                showConfirmButton: true,
            })
            throw error;
        }
    }
)

const updateUserRoleSlice = createSlice({
    name: "updateUserRole",
    initialState: {
        status: "idle",
        message: "",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUpdateUserRole.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUpdateUserRole.fulfilled, (state, action) => {
                state.status = "succeeded";
                const {id, userData} = action.payload;
                state.message = {id, ...userData};

            })
            .addCase(fetchUpdateUserRole.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default updateUserRoleSlice.reducer