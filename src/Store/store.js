import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './slices/leadslice';

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});
