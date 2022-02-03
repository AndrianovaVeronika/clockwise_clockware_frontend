import {createAsyncThunk} from "@reduxjs/toolkit";
import orders from '../constants/orders';
import instance from "../middleware/api";

export const getOrders = createAsyncThunk(orders.GET_ORDERS, async () => {
    try {
        const response = await instance.get('/orders');
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
        const response = await instance.post('/orders', newOrder);
        return {status: response.status};
    } catch (e) {
        return {status: '!ERROR'};
    }
})

export const getOccupiedHours = createAsyncThunk(orders.GET_OCCUPIED_HOURS, async (filterData) => {
    try {
        console.log('getOccupiedHours action master_id & data', filterData.master_id, filterData.date);

        const response = await instance.get('/orders/get-occupied-hours/' + filterData.master_id + '/"' + filterData.date + '"');
        if (response.data) {
            console.log('getOccupiedHours responce', response.data);
            return response.data;
        } else {
            console.log('getOccupiedHours: Query screwed up');
            return {};
        }
    } catch (e) {
        return {status: '!ERROR'};
    }
})