import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../middleware/api";
import clockTypes from "../constants/clockTypes";

export const getClockTypes = createAsyncThunk(clockTypes.GET_CLOCK_TYPES, async (_, thunkAPI) => {
    try {
        const response = await instance.get('/clocktypes');
        return response.data || {};
    } catch (e) {
        console.log(e);
        console.log('getClockTypes: Query screwed up with error');
        return thunkAPI.rejectWithValue(e);
    }
})
