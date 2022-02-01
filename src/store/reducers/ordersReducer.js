import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getOrders, addOrder} from "../actions";
import {getOccupiedHours} from "../actions/orders";

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
            })
            .addCase(addOrder.fulfilled, (state, action) => {
                console.log(action.payload.status === 201 ? 'order added (reducer)' : 'order reducer: error query status: ' + action.payload.status);
            })
            .addCase(getOccupiedHours.fulfilled, (state, action) => {
                console.log('returned from backend');
                console.log('OCCUPIED HOURS FROM BACK', action.payload);
                state.orders.occupiedHours = action.payload;
                console.log('saved to redux');
            })
    }
})

export default reducer;