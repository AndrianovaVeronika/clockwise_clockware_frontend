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
});

export const addOrder = createAsyncThunk(orders.ADD_ORDER, async (newOrder, thunkAPI) => {
    try {
        const response = await instance.post('/api/orders', newOrder);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateOrder = createAsyncThunk(orders.UPDATE_ORDER, async (orderId, thunkAPI) => {
    try {
        const response = await instance.put('api/orders/' + orderId);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteOrder = createAsyncThunk(orders.DELETE_ORDER, async (orderId, thunkAPI) => {
    try {
        const response = await instance.delete('api/orders/' + orderId);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});