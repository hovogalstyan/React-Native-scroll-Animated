import { createAsyncThunk } from "@reduxjs/toolkit";
export const getUsers = createAsyncThunk("getPicturesList", async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=100');
    const data = await response.json();
    return data.results;
  } catch (error) {
    return error;
  }
});
