import { configureStore, combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
const rootReducer = combineReducers({
   UserSlice
})

export const store = configureStore({reducer:rootReducer})
