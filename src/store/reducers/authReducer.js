import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {createMasterAccount, logOut, signIn, verifyEmailState, verifyUserAccess} from "../actions/auth";

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
                if (action.payload.roles.includes('ROLE_ADMIN')) {
                    state.auth.isAdmin = true;
                }
            })
            .addCase(verifyUserAccess.rejected, (state, action) => {
                state.auth.userLoading = false;
                state.auth.isAuth = false;
                state.auth.currentUser = {};
                state.auth.isAdmin = false;
            })
            .addCase(createMasterAccount.fulfilled, (state, action) => {
                console.log(action.payload)
                state.users.usersList.push(action.payload);
                if (!state.masters.mastersList.indexOf(action.payload)){
                    state.masters.mastersList.push(action.payload);
                }
            })
            .addCase(verifyEmailState.fulfilled, (state, action) => {
                state.auth.currentUser.emailChecked = true;
            })
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;