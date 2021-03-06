import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {addUser, deleteUser, getUserById, getUsers, updateUser} from "../actions/users";
import {signUp} from "../actions/auth";
import createReducerApi from "../middleware/createReducerApi";
const api = createReducerApi('users');

const {reducer} = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(signUp.fulfilled, api.ADD)
            .addCase(addUser.fulfilled, api.ADD)
            .addCase(getUsers.fulfilled, api.GET)
            .addCase(updateUser.fulfilled, api.UPDATE)
            .addCase(deleteUser.fulfilled, api.DELETE)
            .addCase(getUserById.fulfilled, (state, action) =>{
                state.users.orderUser = action.payload;
            })
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;