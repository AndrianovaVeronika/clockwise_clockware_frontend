import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getMasters} from "../actions";
import {addOrder} from "../actions/orders";
import {addMaster} from "../actions/masters";

const {reducer} = createSlice({
    name: 'masters',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(getMasters.fulfilled, (state, action) => {
                console.log('returned from backend');
                state.masters.mastersList = action.payload;
                console.log('saved to redux');
            })
            .addCase(addMaster.fulfilled, (state, action) => {
                console.log(action.payload.status);
            })
    }
})

export default reducer;