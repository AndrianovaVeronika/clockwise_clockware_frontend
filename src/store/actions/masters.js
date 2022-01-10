import {createAsyncThunk} from "@reduxjs/toolkit";
import masters from '../constants/masters';
import instance from "../middleware/api";

export const getMasters = createAsyncThunk(masters.GET_MASTERS, async () => {
    try {
        console.log('Going to backend');
        const response = await instance.get('/masters');
        if (response.data) {
            console.log('oh, yes, query works');
            return response.data;
        } else {
            console.log('Query screwed up');
            return {};
        }
    } catch (e) {
        console.log(e);
        console.log('Query screwed up with error');
        return {};
    }
})

