import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import users from "../actions/users";
import createReducerApi from "../middleware/createReducerApi";
import {registerUserAccount} from "../actions/auth";
const api = createReducerApi('users');

const {reducer} = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(registerUserAccount.fulfilled, api.ADD)
            .addCase(users.add.fulfilled, api.ADD)
            .addCase(users.getAll.fulfilled, api.GET)
            .addCase(users.getById.fulfilled, api.GET_BY_ID)
            .addCase(users.update.fulfilled, api.UPDATE)
            .addCase(users.delete.fulfilled, api.DELETE)
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;