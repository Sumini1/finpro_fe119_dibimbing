import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTransaction = createAsyncThunk(
  "transaction/fetchTransaction",
  async () => {
    try {
      const response = await fetch(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-transactions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchTransactionById = createAsyncThunk(
  "transactionId/fetchTransactionById",
  async (id) => {
    try {
      const response = await fetch(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/transaction/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCreateTransaction = createAsyncThunk(
  "createTransaction/fetchCreateTransaction",
  async (TransactionData) => {
    try {
      const accesToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction",
        TransactionData,
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
        title: "Create Transaction Successfully",
        icon: "success",
        text: data.message,
        showConfirmButton: true,
      });
      return data;
    } catch (error) {
      // console.error(error);
      Swal.fire({
        title: "Create Transaction Failed",
        icon: "error",
        text: error.message,
        showConfirmButton: true,
      });
      throw error;
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    transactionDetail: null,
    status: "idle",
    error: null,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch transaction
      .addCase(fetchTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload.data;
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // fetch transaction id
      .addCase(fetchTransactionById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactionById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactionDetail = action.payload.data;
      })
      .addCase(fetchTransactionById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // fetch Create Transaction
      .addCase(fetchCreateTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCreateTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload.message;
      })
      .addCase(fetchCreateTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
