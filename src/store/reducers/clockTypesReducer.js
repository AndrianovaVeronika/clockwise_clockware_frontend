import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getClockTypes} from "../actions/clockTypes";
import {createReducerApi} from "../middleware/createApi";
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
            .addCase(getClockTypes.fulfilled, api.GET);
    }
})

export default reducer;