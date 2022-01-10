import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getOrders} from "../actions";
import {addOrder} from "../actions/orders";

const {reducer} = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                console.log('returned from backend');
                state.orders.ordersList = action.payload;
                console.log('saved to redux');
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                console.log(action.payload.status);
            })
    }
})

export default reducer;