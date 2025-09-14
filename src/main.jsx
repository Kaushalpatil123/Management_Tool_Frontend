import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from "./Store/store.js";
import { Provider } from "react-redux";   // ✅ import Provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>    {/* ✅ wrap App with Provider */}
      <App />
    </Provider>
  </StrictMode>
);
