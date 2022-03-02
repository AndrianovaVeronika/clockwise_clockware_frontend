import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getCities, addCity, updateCity, deleteCity} from "../actions/cities";

const {reducer} = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(getCities.fulfilled, (state, action) => {
                state.cities.citiesList = action.payload;
            })
            .addCase(addCity.fulfilled, (state, action) => {
                console.log(action.payload.message);
            })
            .addCase(updateCity.fulfilled, (state, action) => {
                console.log(action.payload.message);
            })
            .addCase(deleteCity.fulfilled, (state, action) => {
                console.log(action.payload.message);
            })
    }
})

export default reducer;