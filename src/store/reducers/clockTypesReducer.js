import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getClockTypes} from "../actions/clockTypes";
import createReducerApi from "../middleware/createReducerApi";
import clockTypes from "../constants/clockTypes";
const api = createReducerApi('clockTypes');

const {reducer} = createSlice({
    name: 'clockTypes',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(getClockTypes.fulfilled, api.GET)
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;