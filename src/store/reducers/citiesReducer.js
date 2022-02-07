import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getCities, addCity} from "../actions";

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
            // .addCase(getCityById.fulfilled, (state, action) => {
            //     console.log(action.payload[0].name);
            // })
            .addCase(addCity.fulfilled, (state, action) => {
                console.log(action.payload.status === 201 ? 'city added (reducer)' : 'city reducer: error query status: ' + action.payload.status);
            })
    }
})

export default reducer;