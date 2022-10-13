import initialState from "../initialState";
import {createSlice, current} from "@reduxjs/toolkit";
import orders from "../actions/orders";
import reducerApi from "../middleware/createReducerApi";

const {reducer} = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(orders.getAll.fulfilled, reducerApi.GET('orders'))
            .addCase(orders.getFiltered.fulfilled, reducerApi.GET_FILTERED('orders'))
            .addCase(orders.getById.fulfilled, reducerApi.GET_BY_ID('orders'))
            .addCase(orders.add.fulfilled, reducerApi.ADD('orders'))
            .addCase(orders.update.fulfilled, reducerApi.UPDATE('orders'))
            .addCase(orders.delete.fulfilled, reducerApi.DELETE('orders'))
            .addCase(orders.getCurrentUserOrders.fulfilled, (state, action) => {
                state.orders.currentUserOrders = action.payload;
            })
            .addCase(orders.getCurrentMasterOrders.fulfilled, (state, action) => {
                state.orders.currentMasterOrders = action.payload;
            })
            .addCase(orders.updateMasterOrderById.fulfilled, (state, action) => {
                const list = current(state.orders.currentMasterOrders);
                state.orders.currentMasterOrders = list.map(instance => instance.id === parseInt(action.payload.id) ? action.payload : instance);
            })
            .addCase(orders.rateOrder, (state, action) => {
                const list = current(state.orders.currentUserOrders);
                state.orders.currentUserOrders = list.map(instance => instance.id === parseInt(action.payload.id) ? action.payload : instance);
            })
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;