import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './slices/leadslice';
import quoteReducer from "./slices/QuoteSlice";
import invoiceReducer from "./slices/invoiceSlice";


export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    quotes: quoteReducer,
     invoices: invoiceReducer,
  },
});
