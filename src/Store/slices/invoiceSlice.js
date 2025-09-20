import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/api";

const API_URL = `${config.backendUrl}/api/invoices`;

// ➡️ Get all invoices
export const fetchInvoices = createAsyncThunk("invoices/fetchAll", async () => {
    const res = await axios.get(API_URL);
    return res.data;
});

// ➡️ Get single invoice by ID
export const fetchInvoiceById = createAsyncThunk(
    "invoices/fetchById",
    async (id) => {
        const res = await axios.get(`${API_URL}/${id}`);
        return res.data;
    }
);

// ➡️ Create invoice
export const createInvoice = createAsyncThunk(
    "invoices/create",
    async (invoiceData, { rejectWithValue }) => {
        try {
            const res = await axios.post(API_URL, invoiceData);
            return res.data;
        } catch (err) {
            // If backend sends message, forward it
            if (err.response && err.response.data && err.response.data.message) {
                return rejectWithValue(err.response.data.message);
            }
            return rejectWithValue(err.message || "Something went wrong");
        }
    }
);


// ➡️ Update invoice
export const updateInvoice = createAsyncThunk(
    "invoices/update",
    async ({ id, updatedData }) => {
        const res = await axios.put(`${API_URL}/${id}`, updatedData);
        return res.data;
    }
);

// ➡️ Delete invoice
export const deleteInvoice = createAsyncThunk(
    "invoices/delete",
    async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    }
);

const invoiceSlice = createSlice({
    name: "invoices",
    initialState: {
        invoices: [],
        selectedInvoice: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearSelectedInvoice: (state) => {
            state.selectedInvoice = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all
            .addCase(fetchInvoices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.loading = false;
                state.invoices = action.payload;
            })
            .addCase(fetchInvoices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Fetch by ID
            .addCase(fetchInvoiceById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInvoiceById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedInvoice = action.payload;
            })
            .addCase(fetchInvoiceById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Create
            .addCase(createInvoice.fulfilled, (state, action) => {
                state.invoices.unshift(action.payload); // add new at top
            })

            // Update
            .addCase(updateInvoice.fulfilled, (state, action) => {
                state.invoices = state.invoices.map((invoice) =>
                    invoice._id === action.payload._id ? action.payload : invoice
                );
                if (state.selectedInvoice?._id === action.payload._id) {
                    state.selectedInvoice = action.payload;
                }
            })

            // Delete
            .addCase(deleteInvoice.fulfilled, (state, action) => {
                state.invoices = state.invoices.filter(
                    (invoice) => invoice._id !== action.payload
                );
                if (state.selectedInvoice?._id === action.payload) {
                    state.selectedInvoice = null;
                }
            });
    },
});

export const { clearSelectedInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
