import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import clockTypes from "../actions/clockTypes";
import reducerApi from "../middleware/createReducerApi";

const {reducer} = createSlice({
    name: 'clockTypes',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(clockTypes.getAll.fulfilled, reducerApi.GET('clockTypes'))
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;