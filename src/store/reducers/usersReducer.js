import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import users from "../actions/users";
import reducerApi from "../middleware/createReducerApi";
import {registerUserAccount} from "../actions/auth";

const {reducer} = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(registerUserAccount.fulfilled, reducerApi.ADD('/users'))
            .addCase(users.add.fulfilled, reducerApi.ADD('/users'))
            .addCase(users.getAll.fulfilled, reducerApi.GET('/users'))
            .addCase(users.getById.fulfilled, reducerApi.GET_BY_ID('/users'))
            .addCase(users.update.fulfilled, reducerApi.UPDATE('/users'))
            .addCase(users.delete.fulfilled, reducerApi.DELETE('/users'))
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;