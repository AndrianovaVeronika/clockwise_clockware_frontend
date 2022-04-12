import {createAsyncThunk} from "@reduxjs/toolkit";
import masters from '../constants/masters';
import instance from "../middleware/api";

export const getMasters = createAsyncThunk(masters.GET_MASTERS, async (_, thunkAPI) => {
    try {
        const response = await instance.get('/masters');
        return response.data || {};
    } catch (e) {
        console.log('getMasters: Query screwed up with error');
        return thunkAPI.rejectWithValue(e);
    }
});

export const addMaster = createAsyncThunk(masters.ADD_MASTER, async (newMaster, thunkAPI) => {
    try {
        const response = await instance.post('/masters', newMaster);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateMaster = createAsyncThunk(masters.UPDATE_MASTER, async ({id, ...updateValue}, thunkAPI) => {
    try {
        const response = await instance.put('/masters/' + id, updateValue);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteMaster = createAsyncThunk(masters.DELETE_MASTER, async (masterId, thunkAPI) => {
    try {
        const response = await instance.delete('/masters/' + masterId);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});