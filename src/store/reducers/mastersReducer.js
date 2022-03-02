import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getMasters, addMaster, updateMaster, deleteMaster} from "../actions/masters";

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
                console.log(action.payload.message);
            })
            .addCase(updateMaster.fulfilled, (state, action) => {
                console.log(action.payload.message);
            })
            .addCase(deleteMaster.fulfilled, (state, action) => {
                console.log(action.payload.message);
            })
    }
})

export default reducer;