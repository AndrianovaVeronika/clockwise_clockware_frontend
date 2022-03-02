import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {getUsers, deleteUser, updateUser} from "../actions/users";

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
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log(action.payload.message);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                console.log(action.payload.message);
            })
    }
})

export default reducer;