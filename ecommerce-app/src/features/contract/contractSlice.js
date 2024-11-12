import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { contractService } from "./contractService";

export const createQuery = createAsyncThunk(
  "contract/post",
  async (contractData, thunkAPI) => {
    try {
      return await contractService.postQuery(contractData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

  export const resetState = createAction("Reset_all");

const contractState = {
    contract: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const contractSlice = createSlice({
  name: "contract",
  initialState: contractState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.contract = action.payload;
        if(state.isSuccess === true){
          toast.success("Contract form submitted successfully!")
        }
      })
      .addCase(createQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if(state.isError === true){
          toast.error("Something went wrong!")
        }
      })
      .addCase(resetState, () => contractState);
  },
});

export default contractSlice.reducer;