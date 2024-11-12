import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";

export const getAllProducts = createAsyncThunk(
  "product/get",
  async (data, thunkAPI) => {
    try {
      return await productService.getListedProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMyProducts = createAsyncThunk(
  "product/get-my-product",
  async (data, thunkAPI) => {
    try {
      return await productService.getProducts(data);
    } catch (error) {
      if (error.response?.status===401) {
        localStorage.removeItem("customer");
        window.location.reload();
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAProduct = createAsyncThunk(
  "product/getAProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "product/wishlist",
  async ( prodID, thunkAPI) => {
    try {
      return await productService.addToWishlist(prodID);
    } catch (error) {
      if (error.response?.status===401) {
        localStorage.removeItem("customer");
        window.location.reload();
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteFromWishlist = createAsyncThunk(
  "product/delete-wishlist",
  async ( prodID, thunkAPI) => {
    try {
      return await productService.deleteFromWishlist(prodID);
    } catch (error) {
      if (error.response?.status===401) {
        localStorage.removeItem("customer");
        window.location.reload();
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProducts = createAsyncThunk(
    "product/create-products",
    async (productData, thunkAPI) => {
      try {
        //console.log("slicedddd", productData);
        return await productService.offerProduct(productData);
      } catch (error) {
        if (error.response?.status===401) {
          localStorage.removeItem("customer");
          window.location.reload();
        }
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const resetState = createAction("Reset_all");

const productState = {
    product: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};


export const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getMyProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.myProduct = action.payload;
      })
      .addCase(getMyProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToWishlist = action.payload; // state.addwishlist hatalı olabilir 
        state.message = "Product Added To Wishlist"
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteFromWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deleteFromWishlist = action.payload; // state.addwishlist hatalı olabilir 
        state.message = "Product Deleted From Wishlist"
      })
      .addCase(deleteFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singleproduct = action.payload;
        state.message = "Product Fetced Successfully!"
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => productState);
  },
});

export default productSlice.reducer;