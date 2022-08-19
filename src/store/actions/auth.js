import {createAsyncThunk} from "@reduxjs/toolkit";
import auth from "../constants/auth";
import createActionApi from "../middleware/createActionApi";
import instance from "../middleware/instance";

export const signUp = createAsyncThunk(auth.SIGN_UP, createActionApi('auth/signup').POST);

export const signIn = createAsyncThunk(auth.SIGN_IN, createActionApi('auth/signin').POST);

export const verifyUserAccess = createAsyncThunk(auth.VERIFY_USER_ACCESS, createActionApi('auth/checktocken').GET);

export const createMasterAccount = createAsyncThunk(auth.CREATE_MASTER_ACCOUNT, createActionApi('auth/registrate_master').POST);

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