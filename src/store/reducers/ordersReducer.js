import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getOrders, addOrder, updateOrder, deleteOrder} from "../actions/orders";
import createReducerApi from "../middleware/createReducerApi";
const api = createReducerApi('orders');

const {reducer} = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(getOrders.fulfilled, api.GET)
            .addCase(addOrder.fulfilled, api.ADD)
            .addCase(updateOrder.fulfilled, api.UPDATE)
            .addCase(deleteOrder.fulfilled, api.DELETE)
            .addCase(getOrders.rejected, api.REJECTED);
    }
})

export default reducer;