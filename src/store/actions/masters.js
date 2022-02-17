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
})

// export const getMastersById = createAsyncThunk(masters.GET_MASTER_BY_ID, async (id) => {
//     try {
//         const response = await instance.get('/masters/' + id);
//         if (response.data) {
//             return response.data;
//         } else {
//             console.log('getMasters: Query screwed up');
//             return {};
//         }
//     } catch (e) {
//         console.log('getMasters: Query screwed up with error');
//         return {};
//     }
// })

export const addMaster = createAsyncThunk(masters.ADD_MASTER, async (newMaster, thunkAPI) => {
    try {
        const response = await instance.post('/api/masters', newMaster);

        if (response.status === 201) {
            return {status: 'new master added'};
        } else {
            return {status: 'smth went wrong (new master havent been added)'};
        }
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
})