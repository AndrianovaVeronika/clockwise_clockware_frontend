import {createAsyncThunk} from "@reduxjs/toolkit";
import users from "../constants/users";
import createActionApi from "../middleware/createActionApi";
import auth from "../constants/auth";
import instance from "../middleware/instance";

const api = createActionApi('users');

const addUser = createAsyncThunk(users.ADD_USER, api.POST);

const getUsers = createAsyncThunk(users.GET_USERS, api.GET);

const updateUser = createAsyncThunk(users.UPDATE_USER, api.PUT);

const deleteUser = createAsyncThunk(users.DELETE_USER, api.DELETE);

const getUserById = createAsyncThunk(users.GET_USER_BY_ID, api.GET_BY_ID);

export const resetPassword = createAsyncThunk(users.RESET_PASSWORD, async (id, thunkAPI) => {
    try {
        const response = await instance.put('/reset/password/'+ id, {
            headers: {
                'x-access-token': sessionStorage.getItem('TOKEN')
            }
        });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data)
    }
});

export default {
    getAll: getUsers,
    getById: getUserById,
    add: addUser,
    update: updateUser,
    delete: deleteUser,
}