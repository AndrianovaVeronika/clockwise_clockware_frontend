import {createAsyncThunk} from "@reduxjs/toolkit";
import users from "../constants/users";
import instance from "../middleware/instance";
import actionApi from "../middleware/createActionApi";
import baseHeaders from "../middleware/headers";

const addUser = createAsyncThunk(users.ADD_USER, actionApi.POST('/users'));

const getUsers = createAsyncThunk(users.GET_USERS, actionApi.GET('/users'));

const updateUser = createAsyncThunk(users.UPDATE_USER, actionApi.PUT('/users'));

const deleteUser = createAsyncThunk(users.DELETE_USER, actionApi.DELETE('/users'));

const getUserById = createAsyncThunk(users.GET_USER_BY_ID, actionApi.GET_BY_ID('/users'));

export const resetPassword = createAsyncThunk(users.RESET_PASSWORD, async (id, thunkAPI) => {
    try {
        const response = await instance.put('/reset/password/' + id, {}, {
            headers: {...baseHeaders}
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