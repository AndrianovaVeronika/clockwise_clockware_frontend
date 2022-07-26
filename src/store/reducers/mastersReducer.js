import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import masters from "../actions/masters";
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
            .addCase(masters.getAll.fulfilled, api.GET)
            .addCase(masters.getById.fulfilled, api.GET_BY_ID)
            .addCase(masters.add.fulfilled, api.ADD)
            .addCase(masters.update.fulfilled, api.UPDATE)
            .addCase(masters.delete.fulfilled, api.DELETE)
            .addCase(masters.getAvailableMasters.fulfilled, (state, action) => {
                state.masters.availableMasters = action.payload;
            })
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;