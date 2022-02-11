import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../middleware/api";
import clockTypes from "../constants/clockTypes";

export const getClockTypes = createAsyncThunk(clockTypes.GET_CLOCK_TYPES, async () => {
    try {
        const response = await instance.get('/api/clock_types');
        if (response.data) {
            return response.data;
        } else {
            console.log('getClockTypes: Query screwed up');
            return {};
        }
    } catch (e) {
        console.log(e);
        console.log('getClockTypes: Query screwed up with error');
        return {};
    }
})
