import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/user/userSlice';
import brandReducer from '../needed/brand/brandSlice';
import pCategoryReducer from "../needed/pcategory/pcategorySlice";
import uploadReducer from "../needed/upload/uploadSlice";
import productReducer from "../features/products/productSlice";
import contactReducer from "../features/contact/contactSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
    counter: counterReducer,
    brand: brandReducer,
    pCategory: pCategoryReducer,
    upload: uploadReducer,
    product: productReducer,
    contact: contactReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});
