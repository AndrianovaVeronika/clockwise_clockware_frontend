import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {logOut, signIn, verifyUserAccess} from "../actions/auth";

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
                if (action.payload.roles.includes('ROLE_ADMIN')) {
                    state.auth.isAdmin = true;
                }
                sessionStorage.setItem("TOKEN", action.payload.accessToken);
                state.errors.auth = [];
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.auth.currentUser = {};
                state.auth.isAuth = false;
                state.auth.isAdmin = false;
                sessionStorage.clear();
                state.errors.auth = [];

            })
            .addCase(verifyUserAccess.fulfilled, (state, action) => {
                state.auth.userLoading = false;
                state.auth.isAuth = true;
                state.auth.currentUser = action.payload;
                if (action.payload.roles.includes('ROLE_ADMIN')) {
                    state.auth.isAdmin = true;
                }
                state.errors.auth = [];
            })
            .addCase(verifyUserAccess.rejected, (state, action) => {
                state.auth.userLoading = false;
                state.auth.isAuth = false;
                state.auth.currentUser = {};
                state.auth.isAdmin = false;
            })
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;