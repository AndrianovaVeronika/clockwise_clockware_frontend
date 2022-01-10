import {createAsyncThunk} from "@reduxjs/toolkit";
import masters from '../constants/masters';
import instance from "../middleware/api";
import orders from "../constants/orders";

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

export const addMaster = createAsyncThunk(masters.ADD_MASTER, async (newMaster) => {
    try {
        const response = await instance.post('/masters', newMaster);

        if (response.status === 201){
            return {status: 'new master added'};
        }
        else {
            return {status: 'smth went wrong (new master havent been added)'};
        }
    } catch (e) {
        console.log('!ERROR', e);
        return {status: '!ERROR'};
    }
})