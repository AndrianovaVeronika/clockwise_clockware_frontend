import {createAsyncThunk} from "@reduxjs/toolkit";
import masters from '../constants/masters';
import instance from "../middleware/api";

export const getMasters = createAsyncThunk(masters.GET_MASTERS, async (_, thunkAPI) => {
    try {
        const response = await instance.get('/api/masters');
        return response.data || {};
    } catch (e) {
        console.log('getMasters: Query screwed up with error');
        return thunkAPI.rejectWithValue(e);
    }
});

export const addMaster = createAsyncThunk(masters.ADD_MASTER, async (newMaster, thunkAPI) => {
    try {
        const accessToken = sessionStorage.getItem('TOKEN');
        const response = await instance.post('/api/masters', newMaster, {
            headers: {
                'x-access-token': accessToken
            }
        });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateMaster = createAsyncThunk(masters.UPDATE_MASTER, async ({id, ...updateValue}, thunkAPI) => {
    try {
        const accessToken = sessionStorage.getItem('TOKEN');
        const response = await instance.put('api/masters/' + id, updateValue, {
            headers: {
                'x-access-token': accessToken
            }
        });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteMaster = createAsyncThunk(masters.DELETE_MASTER, async (masterId, thunkAPI) => {
    try {
        const accessToken = sessionStorage.getItem('TOKEN');
        const response = await instance.delete('api/masters/' + masterId, {
            headers: {
                'x-access-token': accessToken
            }
        });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});