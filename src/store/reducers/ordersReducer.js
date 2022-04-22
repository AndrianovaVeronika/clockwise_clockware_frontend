import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getOrders, addOrder, updateOrder, deleteOrder} from "../actions/orders";

const {reducer} = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders.ordersList = action.payload;
                console.log(action.payload)
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                console.log(action.payload.message);
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                console.log(action.payload.message);
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                console.log(action.payload.message);
            })
    }
})

export default reducer;