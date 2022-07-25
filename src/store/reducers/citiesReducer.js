import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import cities from "../actions/cities";
import createReducerApi from "../middleware/createReducerApi";

const api = createReducerApi('cities');

const {reducer} = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(cities.getAll.fulfilled, api.GET)
            .addCase(cities.getById.fulfilled, api.GET_BY_ID)
            .addCase(cities.add.fulfilled, api.ADD)
            .addCase(cities.update.fulfilled, api.UPDATE)
            .addCase(cities.delete.fulfilled, api.DELETE)
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;