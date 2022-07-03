import {createAsyncThunk} from "@reduxjs/toolkit";
import users from "../constants/users";
import createActionApi from "../middleware/createActionApi";
import instance from "../middleware/instance";

const api = createActionApi('users');

export const addUser = createAsyncThunk(users.ADD_USER, api.POST);

export const getUsers = createAsyncThunk(users.GET_USERS, api.GET);

export const updateUser = createAsyncThunk(users.UPDATE_USER, api.PUT);

export const deleteUser = createAsyncThunk(users.DELETE_USER, api.DELETE);

export const getUserById = createAsyncThunk(users.GET_USER_BY_ID, async (id, thunkAPI) => {
    try {
        const response = await instance.get('/orders/' + id, {
            headers: {
                'x-access-token': sessionStorage.getItem('TOKEN')
            }
        });
        return response.data || {};
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
});