import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getClockTypes} from "../actions/clockTypes";

const {reducer} = createSlice({
    name: 'clockTypes',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(getClockTypes.fulfilled, (state, action) => {
                state.clockTypes.clockTypesList = action.payload;
            })
    }
})

export default reducer;