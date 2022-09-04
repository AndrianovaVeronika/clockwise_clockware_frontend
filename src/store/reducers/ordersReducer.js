import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import orders from "../actions/orders";
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
            .addCase(orders.getAll.fulfilled, api.GET)
            .addCase(orders.getById.fulfilled, api.GET_BY_ID)
            .addCase(orders.add.fulfilled, api.ADD)
            .addCase(orders.update.fulfilled, api.UPDATE)
            .addCase(orders.delete.fulfilled, api.DELETE)
            .addCase(orders.getCurrentUserOrders.fulfilled, (state, action) => {
                state.orders.currentUserOrders = action.payload;
            })
            .addCase(orders.getCurrentMasterOrders.fulfilled, (state, action) => {
                state.orders.currentMasterOrders = action.payload;
            })
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;