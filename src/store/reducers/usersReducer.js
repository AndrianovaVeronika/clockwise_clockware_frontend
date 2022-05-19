import initialState from "../initialState";
import {createSlice, current} from "@reduxjs/toolkit";
import {deleteUser, getUsers, updateUser} from "../actions/users";
import {signUp} from "../actions/auth";

const {reducer} = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                state.users.usersList.push(action.payload);
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users.usersList = action.payload;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const usersList = current(state.users.usersList);
                state.users.usersList = usersList.map(user => user.id === parseInt(action.payload.id) ? action.payload : user);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const usersList = current(state.users.usersList);
                state.users.usersList = usersList.filter(user => user.id !== parseInt(action.payload.id));
            })
    }
})

export default reducer;