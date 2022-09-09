import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {
    logOut,
    registerMasterAccount,
    resetPassword,
    signIn,
    verifyEmailState,
    verifyUserAccess
} from "../actions/auth";

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
                if (action.payload.roles.includes('ROLE_MASTER')) {
                    state.auth.isMasterAccount = true;
                }
                sessionStorage.setItem("TOKEN", action?.payload?.accessToken);
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.auth.currentUser = {};
                state.auth.isAuth = false;
                state.auth.isAdmin = false;
                state.auth.isMasterAccount = false;
                sessionStorage.clear();
            })
            .addCase(verifyUserAccess.fulfilled, (state, action) => {
                state.auth.userLoading = false;
                state.auth.isAuth = true;
                state.auth.currentUser = action.payload;
                if (action.payload.roles.includes('ROLE_ADMIN')) {
                    state.auth.isAdmin = true;
                }
                if (action.payload.roles.includes('ROLE_MASTER')) {
                    state.auth.isMasterAccount = true;
                }
            })
            .addCase(verifyUserAccess.rejected, (state, action) => {
                state.auth.userLoading = false;
                state.auth.isAuth = false;
                state.auth.currentUser = {};
                state.auth.isAdmin = false;
                state.auth.isMasterAccount = false;
            })
            .addCase(registerMasterAccount.fulfilled, (state, action) => {
                state.users.usersList.push(action.payload);
                if (!state.masters.mastersList.indexOf(action.payload)) {
                    state.masters.mastersList.push(action.payload);
                }
            })
            .addCase(verifyEmailState.fulfilled, (state, action) => {
                state.auth.currentUser.emailChecked = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                //password reset
            })
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;