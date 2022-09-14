import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import cities from "../actions/cities";
import reducerApi from "../middleware/createReducerApi";

const {reducer} = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(cities.getAll.fulfilled, reducerApi.GET('cities'))
            .addCase(cities.getById.fulfilled, reducerApi.GET_BY_ID('cities'))
            .addCase(cities.add.fulfilled, reducerApi.ADD('cities'))
            .addCase(cities.update.fulfilled, reducerApi.UPDATE('cities'))
            .addCase(cities.delete.fulfilled, reducerApi.DELETE('cities'))
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;