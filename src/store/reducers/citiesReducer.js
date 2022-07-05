import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {addCity, deleteCity, getCities, updateCity} from "../actions/cities";
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
            .addCase(getCities.fulfilled, api.GET)
            .addCase(addCity.fulfilled, api.ADD)
            .addCase(updateCity.fulfilled, api.UPDATE)
            .addCase(deleteCity.fulfilled, api.DELETE)
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;