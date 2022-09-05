import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getClockTypes} from "../actions/clockTypes";
import reducerApi from "../middleware/createReducerApi";

const {reducer} = createSlice({
    name: 'clockTypes',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(getClockTypes.fulfilled, reducerApi.GET('/clocktypes'))
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;