import {createAsyncThunk} from "@reduxjs/toolkit";
import users from "../constants/users";
import {createActionApi} from "../middleware/createApi";

const api = createActionApi('users');

export const getUsers = createAsyncThunk(users.GET_USERS, api.GET);

export const updateUser = createAsyncThunk(users.UPDATE_USER, api.PUT);

export const deleteUser = createAsyncThunk(users.DELETE_USER, api.DELETE);