import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/api";

// Base URL for API
const API_URL = `${config.backendUrl}/api/quotes`;

// -------------------- Async Thunks --------------------

// Create a new quote
export const createQuote = createAsyncThunk(
  "quotes/createQuote",
  async (quoteData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, quoteData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch all quotes
export const fetchQuotes = createAsyncThunk(
  "quotes/fetchQuotes",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch single quote by ID
export const fetchQuoteById = createAsyncThunk(
  "quotes/fetchQuoteById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update a quote
export const updateQuote = createAsyncThunk(
  "quotes/updateQuote",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Delete a quote
export const deleteQuote = createAsyncThunk(
  "quotes/deleteQuote",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// -------------------- Slice --------------------
const quoteSlice = createSlice({
  name: "quotes",
  initialState: {
    quotes: [],
    selectedQuote: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedQuote: (state) => {
      state.selectedQuote = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createQuote.pending, (state) => {
        state.loading = true;
      })
      .addCase(createQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quotes.push(action.payload);
      })
      .addCase(createQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch all
      .addCase(fetchQuotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.loading = false;
        state.quotes = action.payload;
      })
      .addCase(fetchQuotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single
      .addCase(fetchQuoteById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuoteById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedQuote = action.payload;
      })
      .addCase(fetchQuoteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateQuote.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quotes = state.quotes.map((q) =>
          q._id === action.payload._id ? action.payload : q
        );
      })
      .addCase(updateQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteQuote.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quotes = state.quotes.filter((q) => q._id !== action.payload);
      })
      .addCase(deleteQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions & reducer
export const { clearSelectedQuote, clearError } = quoteSlice.actions;
export default quoteSlice.reducer;
