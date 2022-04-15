import {createAsyncThunk} from "@reduxjs/toolkit";
import auth from "../constants/auth";
import createApi from "../middleware/createApi";

export const signUp = createAsyncThunk(auth.SIGN_UP, createApi('auth/signup').POST);

export const signIn = createAsyncThunk(auth.SIGN_IN, createApi('auth/signin').POST);

export const verifyUserAccess = createAsyncThunk(auth.VERIFY_USER_ACCESS, createApi('auth/check').GET);

export const logOut = createAsyncThunk(auth.LOG_OUT, async () => {
    return {message: 'Are u sure u want to logout?'};
});