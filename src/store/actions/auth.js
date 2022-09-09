import {createAsyncThunk} from "@reduxjs/toolkit";
import auth from "../constants/auth";
import actionApi from "../middleware/createActionApi";
import instance from "../middleware/instance";
import baseHeaders from "../middleware/headers";

export const signIn = createAsyncThunk(auth.SIGN_IN, actionApi.POST('/signin'));

export const registerUserAccount = createAsyncThunk(auth.CREATE_USER_ACCOUNT, actionApi.POST('/register/user'));

export const registerMasterAccount = createAsyncThunk(auth.CREATE_MASTER_ACCOUNT, actionApi.POST('/register/master'));

export const verifyUserAccess = createAsyncThunk(auth.VERIFY_USER_ACCESS, actionApi.GET('/access/user'));

export const verifyEmailState = createAsyncThunk(auth.VERIFY_EMAIL_STATE, async (url, thunkAPI) => {
    try {
        const response = await instance.get(url, {...baseHeaders});
        return response.data || {};
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
});

export const logOut = createAsyncThunk(auth.LOG_OUT, async () => {
    return {message: 'Logged out.'};
});

export const isUserCreated = createAsyncThunk(auth.IS_USER_CREATED, actionApi.POST('/verify/user/created'));

export const resetPassword = createAsyncThunk(auth.RESET_PASSWORD, actionApi.PUT('/reset/password'));