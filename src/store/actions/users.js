import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../middleware/api";
import users from "../constants/users";

export const getUsers = createAsyncThunk(users.GET_USERS, async (_, thunkAPI) => {
    try {
        const response = await instance.get('/api/users');
        return response.data || {};
    } catch (e) {
        console.log(e);
        console.log('getUsers: Query screwed up with error');
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateUser = createAsyncThunk(users.UPDATE_USER, async ({id, ...updateValue}, thunkAPI) => {
    try {
        const accessToken = sessionStorage.getItem('TOKEN');
        const response = await instance.put('api/users/' + id, updateValue, {
            headers: {
                'x-access-token': accessToken
            }
        });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteUser = createAsyncThunk(users.DELETE_USER, async (userId, thunkAPI) => {
    try {
        const accessToken = sessionStorage.getItem('TOKEN');
        const response = await instance.delete('api/users/' + userId, {
            headers: {
                'x-access-token': accessToken
            }
        });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});