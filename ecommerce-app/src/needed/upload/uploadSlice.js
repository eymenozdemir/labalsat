import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.data.length; i++) {
        formData.append("images", data.data[i]);
      }
      return await uploadService.uploadImg(formData, data.config);
    } catch (error) {
      if (error.response?.status===401) {
        localStorage.removeItem("customer");
        window.location.reload();
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delImg = createAsyncThunk(
  "delete/images",
  async (id, thunkAPI) => {
    //console.log("tfisgoinon", id);
    try {
      await uploadService.deleteImg(id.id , id.config);
      return id.images.filter(i => i.public_id!==id.id);
    } catch (error) {
      if (error.response?.status===401) {
        localStorage.removeItem("customer");
        window.location.reload();
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetImg = createAction("Reset_all");

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const uploadSlice = createSlice({
  name: "imaegs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images.push(action.payload[0]);
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(delImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(delImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Something went wrong";
      })
      .addCase(resetImg, () => initialState);
  },
});
export default uploadSlice.reducer;
