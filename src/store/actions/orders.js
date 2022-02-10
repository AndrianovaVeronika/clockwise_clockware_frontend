import {createAsyncThunk} from "@reduxjs/toolkit";
import orders from '../constants/orders';
import instance from "../middleware/api";

export const getOrders = createAsyncThunk(orders.GET_ORDERS, async () => {
    try {
        const response = await instance.get('/api/orders');
        if (response.data) {
            return response.data;
        } else {
            console.log('getOrders: Query screwed up');
            return {};
        }
    } catch (e) {
        console.log(e);
        return {};
    }
})

export const addOrder = createAsyncThunk(orders.ADD_ORDER, async (newOrder) => {
    try {
        const response = await instance.post('/api/orders', newOrder);
        return {status: response.status};
    } catch (e) {
        return {status: '!ERROR'};
    }
})