import initialState from "../initialState";
import {createSlice, current} from "@reduxjs/toolkit";
import {addCity, deleteCity, getCities, updateCity} from "../actions/cities";
import {createReducerApi} from "../middleware/createApi";
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
            .addCase(deleteCity.fulfilled, api.DELETE);
    }
})

export default reducer;