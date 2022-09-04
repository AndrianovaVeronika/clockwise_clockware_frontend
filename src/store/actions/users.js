import {createAsyncThunk} from "@reduxjs/toolkit";
import users from "../constants/users";
import actionApi from "../middleware/createActionApi";

const addUser = createAsyncThunk(users.ADD_USER, actionApi.POST('/users'));

const getUsers = createAsyncThunk(users.GET_USERS, actionApi.GET('/users'));

const updateUser = createAsyncThunk(users.UPDATE_USER, actionApi.PUT('/users'));

const deleteUser = createAsyncThunk(users.DELETE_USER, actionApi.DELETE('/users'));

const getUserById = createAsyncThunk(users.GET_USER_BY_ID, actionApi.GET_BY_ID('/users'));

export default {
    getAll: getUsers,
    getById: getUserById,
    add: addUser,
    update: updateUser,
    delete: deleteUser,
}