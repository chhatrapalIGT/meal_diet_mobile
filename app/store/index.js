// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './Slices/languageSlice';

const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});

export default store;
