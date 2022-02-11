import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getMasters, addMaster, getMasterCities} from "../actions";

const {reducer} = createSlice({
    name: 'masters',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(getMasters.fulfilled, (state, action) => {
                state.masters.mastersList = action.payload;
            })
            .addCase(addMaster.fulfilled, (state, action) => {
                console.log(action.payload.status === 201 ? 'master added (reducer)' : 'master reducer: error query status: ' + action.payload.status);
            })
    }
})

export default reducer;