import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {signIn, signUp, getUsers, verifyUserAccess, verifyAdminAccess} from "../actions";

const {reducer} = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users.usersList = action.payload;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                console.log(action.payload.status === 201 ? 'user added (reducer)' : 'user reducer: error query status: ' + action.payload.status);
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.auth.currentUser = action.payload;
                state.auth.isAuth = true;
                sessionStorage.setItem("TOKEN", action.payload.accessToken);
            })
            .addCase(verifyUserAccess.fulfilled, (state, action) => {
                state.auth.userLoading = false;
                state.auth.isAuth = true;
                state.auth.currentUser = action.payload;
            })
            .addCase(verifyUserAccess.rejected, (state, action)=>{
                state.auth.userLoading = false;
                state.auth.isAuth = false;
                state.auth.currentUser = {};
            })
            .addCase(verifyAdminAccess.fulfilled, (state, action) => {
                //...
            })
    }
})

export default reducer;