import {createAsyncThunk} from "@reduxjs/toolkit";
import auth from "../constants/auth";
import createActionApi from "../middleware/createActionApi";

export const signUp = createAsyncThunk(auth.SIGN_UP, createActionApi('auth/signup').POST);

export const signIn = createAsyncThunk(auth.SIGN_IN, createActionApi('auth/signin').POST);

export const verifyUserAccess = createAsyncThunk(auth.VERIFY_USER_ACCESS, createActionApi('auth/checktocken').GET);

export const logOut = createAsyncThunk(auth.LOG_OUT, async () => {
    return {message: 'Logging out...'};
});