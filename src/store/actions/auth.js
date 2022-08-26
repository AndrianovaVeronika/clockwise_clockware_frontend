import {createAsyncThunk} from "@reduxjs/toolkit";
import auth from "../constants/auth";
import createActionApi from "../middleware/createActionApi";
import instance from "../middleware/instance";

export const signIn = createAsyncThunk(auth.SIGN_IN, createActionApi('signin').POST);

export const registerUserAccount = createAsyncThunk(auth.CREATE_USER_ACCOUNT, createActionApi('register/user').POST);

export const registerMasterAccount = createAsyncThunk(auth.CREATE_MASTER_ACCOUNT, createActionApi('register/master').POST);

export const verifyUserAccess = createAsyncThunk(auth.VERIFY_USER_ACCESS, createActionApi('access/user').GET);

export const verifyEmailState = createAsyncThunk(auth.VERIFY_EMAIL_STATE, async (url, thunkAPI) => {
    try {
        const response = await instance.get(url, {
            headers: {
                'x-access-token': sessionStorage.getItem('TOKEN')
            }
        });
        return response.data || {};
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
});

export const logOut = createAsyncThunk(auth.LOG_OUT, async () => {
    return {message: 'Logged out.'};
});

export const resetPassword = createAsyncThunk(auth.RESET_PASSWORD, async (recipient, thunkAPI) => {
    try {
        console.log(recipient)
        const response = await instance.put('/reset/password', {recipient: recipient}, {
            headers: {
                'x-access-token': sessionStorage.getItem('TOKEN')
            }
        });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
});