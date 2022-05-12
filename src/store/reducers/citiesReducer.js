import initialState from "../initialState";
import {createSlice, current} from "@reduxjs/toolkit";
import {addCity, deleteCity, getCities, updateCity} from "../actions/cities";

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
                state.cities.citiesList.push(action.payload);
                console.log(action.payload);
            })
            .addCase(updateCity.fulfilled, (state, action) => {
                const citiesList = current(state.cities.citiesList);
                state.cities.citiesList = citiesList.map(city => city.id === parseInt(action.payload.id) ? action.payload : city);
            })
            .addCase(deleteCity.fulfilled, (state, action) => {
                const citiesList = current(state.cities.citiesList);
                state.cities.citiesList = citiesList.filter(city => city.id !== parseInt(action.payload.id));
            })
    }
})

export default reducer;