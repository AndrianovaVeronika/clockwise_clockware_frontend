import {createAsyncThunk} from "@reduxjs/toolkit";
import orders from '../constants/orders';
import instance from "../middleware/api";

export const getOrders = createAsyncThunk(orders.GET_ORDERS, async (_, thunkAPI) => {
    try {
        const response = await instance.get('/api/orders');
        return response.data || {};
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e);
    }
})

export const addOrder = createAsyncThunk(orders.ADD_ORDER, async (newOrder, thunkAPI) => {
    try {
        const response = await instance.post('/api/orders', newOrder);
        return {status: response.status};
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
})