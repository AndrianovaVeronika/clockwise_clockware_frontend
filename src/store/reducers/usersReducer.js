import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getUsers} from "../actions";

const {reducer} = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users.usersList = action.payload;
            })
    }
})

export default reducer;