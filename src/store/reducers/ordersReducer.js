import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getOrders, addOrder} from "../actions";

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
    }
})

export default reducer;