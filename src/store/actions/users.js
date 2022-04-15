import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../middleware/instance";
import users from "../constants/users";
import createApi from "../middleware/createApi";

const api = createApi('users');

export const getUsers = createAsyncThunk(users.GET_USERS, api.GET);

export const updateUser = createAsyncThunk(users.UPDATE_USER, api.PUT);

export const deleteUser = createAsyncThunk(users.DELETE_USER, api.DELETE);