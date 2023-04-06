import { createSlice } from "@reduxjs/toolkit";
import {getUsers } from "./Api/Api";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const UserSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.users = [];
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    });
    builder.addCase(getUsers.rejected,(state, action)=>{
      state.loading = false;
      state.users = [];
      state.error = action.payload;
    })
  },
});
export default UserSlice.reducer;
