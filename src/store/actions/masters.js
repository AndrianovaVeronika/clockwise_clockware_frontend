import {createAsyncThunk} from "@reduxjs/toolkit";
import masters from '../constants/masters';
import createActionApi from "../middleware/createActionApi";
import instance from "../middleware/instance";

const api = createActionApi('masters');

export const getMasters = createAsyncThunk(masters.GET_MASTERS, api.GET);

export const addMaster = createAsyncThunk(masters.ADD_MASTER, api.POST);

export const updateMaster = createAsyncThunk(masters.UPDATE_MASTER, api.PUT);

export const deleteMaster = createAsyncThunk(masters.DELETE_MASTER, api.DELETE);

export const getAvailableMasters = createAsyncThunk(masters.GET_AVAILABLE_MASTERS, async (values, thunkAPI) => {
    try {
        console.log('with values:')
        console.log(values)
        const response = await instance.post('/masters/available', values, {
            headers: {
                'x-access-token': sessionStorage.getItem('TOKEN')
            }
        });
        return response.data || {};
    } catch (err) {
        return thunkAPI.rejectWithValue(err);
    }
})