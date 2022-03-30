import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../middleware/api";
import auth from "../constants/auth";

export const signUp = createAsyncThunk(auth.SIGN_UP, async (newUser, thunkAPI) => {
    try {
        const response = await instance.post('/api/auth/signup', newUser);
        return response.data;
    } catch (e) {
        console.log(e);
        console.log('signUp: Query screwed up with error');
        return thunkAPI.rejectWithValue(e);
    }
});

export const signIn = createAsyncThunk(auth.SIGN_IN, async (user, thunkAPI) => {
    try {
        const response = await instance.post('/api/auth/signin', user);
        return response.data;
    } catch (e) {
        console.log(e);
        console.log('signIn: Query screwed up with error');
        return thunkAPI.rejectWithValue(e);
    }
});

export const logOut = createAsyncThunk(auth.LOG_OUT, async (_, thunkAPI) => {
    try {
        return {message: 'Are u sure u want to logout?'};
    } catch (e) {
        console.log(e);
        console.log('logOut: error');
        return thunkAPI.rejectWithValue(e);
    }
});

export const verifyUserAccess = createAsyncThunk(auth.VERIFY_USER_ACCESS, async (_, thunkAPI) => {
    try {
        const accessToken = sessionStorage.getItem('TOKEN');
        const response = await instance.get('/api/test/user', {
            headers: {
                'x-access-token': accessToken
            }
        });
        return response.data;
    } catch (e) {
        console.log('verifyUserAccess: Query screwed up with error', e);
        return thunkAPI.rejectWithValue(e);
    }
});