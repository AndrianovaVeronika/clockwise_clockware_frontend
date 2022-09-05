import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import masters from "../actions/masters";
import reducerApi from "../middleware/createReducerApi";

const {reducer} = createSlice({
    name: 'masters',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(masters.getAll.fulfilled, reducerApi.GET('/masters'))
            .addCase(masters.getById.fulfilled, reducerApi.GET_BY_ID('/masters'))
            .addCase(masters.add.fulfilled, reducerApi.ADD('/masters'))
            .addCase(masters.update.fulfilled, reducerApi.UPDATE('/masters'))
            .addCase(masters.delete.fulfilled, reducerApi.DELETE('/masters'))
            .addCase(masters.getAvailableMasters.fulfilled, (state, action) => {
                state.masters.availableMasters = action.payload;
            })
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;