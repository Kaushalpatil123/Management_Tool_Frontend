import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/api";

const API_URL = `${config.backendUrl}/api/leads`;

// Fetch all leads
export const fetchLeads = createAsyncThunk("leads/fetchLeads", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Create new lead
export const createLead = createAsyncThunk("leads/createLead", async (leadData) => {
  const res = await axios.post(API_URL, leadData);
  return res.data;
});

// Update lead
export const updateLead = createAsyncThunk("leads/updateLead", async ({ id, updatedData }) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData);
  return res.data;
});

// Delete lead
export const deleteLead = createAsyncThunk("leads/deleteLead", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; // return deleted id
});

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create
      .addCase(createLead.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update
      .addCase(updateLead.fulfilled, (state, action) => {
        const index = state.items.findIndex((lead) => lead._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // Delete
      .addCase(deleteLead.fulfilled, (state, action) => {
        state.items = state.items.filter((lead) => lead._id !== action.payload);
      });
  },
});

export default leadsSlice.reducer;
