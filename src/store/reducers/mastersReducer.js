import initialState from "../initialState";
import {createSlice, current} from "@reduxjs/toolkit";
import {addMaster, deleteMaster, getAvailableMasters, getMasters, updateMaster} from "../actions/masters";
import createReducerApi from "../middleware/createReducerApi";

const api = createReducerApi('masters');

const {reducer} = createSlice({
    name: 'masters',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(getMasters.fulfilled, api.GET)
            .addCase(addMaster.fulfilled, api.ADD)
            .addCase(updateMaster.fulfilled, api.UPDATE)
            .addCase(deleteMaster.fulfilled, api.DELETE)
            .addCase(getAvailableMasters.fulfilled, (state, action) => {
                state.masters.availableMasters = action.payload;
                state.errors.masters = [];
            })
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;