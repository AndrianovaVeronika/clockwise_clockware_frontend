import initialState from "../initialState";
import {createSlice, current} from "@reduxjs/toolkit";
import {signIn, signUp, verifyUserAccess, logOut} from "../actions/auth";

const {reducer} = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                state.auth.currentUser = action.payload;
                state.auth.isAuth = true;
                sessionStorage.setItem("TOKEN", action.payload.accessToken);
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.auth.currentUser = {};
                state.auth.isAuth = false;
                state.auth.isAdmin = false;
                sessionStorage.clear();
            })
            .addCase(verifyUserAccess.fulfilled, (state, action) => {
                state.auth.userLoading = false;
                state.auth.isAuth = true;
                state.auth.currentUser = action.payload;
                if (action.payload.roles.includes('ROLE_ADMIN')){
                    state.auth.isAdmin = true;
                }
            })
            .addCase(verifyUserAccess.rejected, (state, action)=>{
                state.auth.userLoading = false;
                state.auth.isAuth = false;
                state.auth.currentUser = {};
                state.auth.isAdmin = false;
            });
    }
})

export default reducer;