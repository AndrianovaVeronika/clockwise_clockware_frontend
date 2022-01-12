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
                console.log('returned from backend');
                state.cities.citiesList = action.payload;
                console.log('saved to redux');
            })
            .addCase(addCity.fulfilled, (state, action) => {
                console.log(action.payload.status);
            })
    }
})

export default reducer;