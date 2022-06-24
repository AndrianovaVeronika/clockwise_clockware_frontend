import {createAsyncThunk} from "@reduxjs/toolkit";
import auth from "../constants/auth";
import {createActionApi} from "../middleware/createApi";

export const signUp = createAsyncThunk(auth.SIGN_UP, createActionApi('auth/signup').POST);

export const signIn = createAsyncThunk(auth.SIGN_IN, createActionApi('auth/signin').POST);

export const verifyUserAccess = createAsyncThunk(auth.VERIFY_USER_ACCESS, createActionApi('auth/check').GET);

export const logOut = createAsyncThunk(auth.LOG_OUT, async () => {
    return {message: 'Are u sure u want to logout?'};
});

export const findUserOrCreate = createAsyncThunk(auth.FIND_USER_OR_CREATE, createActionApi('find_or_create_user').POST);