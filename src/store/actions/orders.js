import {createAsyncThunk} from "@reduxjs/toolkit";
import orders from '../constants/orders';
import instance from "../middleware/api";

export const getOrders = createAsyncThunk(orders.GET_ORDERS, async () => {
    try {
        console.log('Going to backend');
        const response = await instance.get('/orders');
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

