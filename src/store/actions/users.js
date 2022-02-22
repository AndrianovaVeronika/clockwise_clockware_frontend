import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../middleware/api";
import users from "../constants/users";

export const getUsers = createAsyncThunk(users.GET_USERS, async (_, thunkAPI) => {
    try {
        const response = await instance.get('/api/users');
        if (response.data) {
            return response.data;
        } else {
            console.log('getUsers: Query screwed up');
            return {};
        }
    } catch (e) {
        console.log(e);
        console.log('getUsers: Query screwed up with error');
        return thunkAPI.rejectWithValue(e);
    }
});