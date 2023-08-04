import { combineReducers } from "@reduxjs/toolkit";

//Slices
import authSlice from "./slices/authSlice";

export const rootReducer = combineReducers({auth: authSlice})

