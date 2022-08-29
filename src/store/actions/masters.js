import {createAsyncThunk} from "@reduxjs/toolkit";
import masters from '../constants/masters';
import createActionApi from "../middleware/createActionApi";
import instance from "../middleware/instance";

const api = createActionApi('masters');

const getMasters = createAsyncThunk(masters.GET_MASTERS, api.GET);

const getMasterById = createAsyncThunk(masters.GET_MASTER_BY_ID, api.GET_BY_ID);

const addMaster = createAsyncThunk(masters.ADD_MASTER, api.POST);

const updateMaster = createAsyncThunk(masters.UPDATE_MASTER, api.PUT);

const deleteMaster = createAsyncThunk(masters.DELETE_MASTER, api.DELETE);

const getAvailableMasters = createAsyncThunk(masters.GET_AVAILABLE_MASTERS, async (values, thunkAPI) => {
    try {
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

export default {
    getAll: getMasters,
    getById: getMasterById,
    add: addMaster,
    update: updateMaster,
    delete: deleteMaster,
    getAvailableMasters: getAvailableMasters
}