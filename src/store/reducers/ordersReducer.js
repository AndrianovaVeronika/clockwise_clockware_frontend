import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
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
            .addCase(orders.getAll.fulfilled, reducerApi.GET('/orders'))
            .addCase(orders.getById.fulfilled, reducerApi.GET_BY_ID('/orders'))
            .addCase(orders.add.fulfilled, reducerApi.ADD('/orders'))
            .addCase(orders.update.fulfilled, reducerApi.UPDATE('/orders'))
            .addCase(orders.delete.fulfilled, reducerApi.DELETE('/orders'))
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