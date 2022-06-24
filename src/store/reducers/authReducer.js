import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {findUserOrCreate, logOut, signIn, verifyUserAccess} from "../actions/auth";

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
                state.auth.orderUser = action.payload;
                state.auth.isAuth = true;
                if (action.payload.roles.includes('ROLE_ADMIN')) {
                    state.auth.isAdmin = true;
                }
                sessionStorage.setItem("TOKEN", action.payload.accessToken);
            })
            .addCase(findUserOrCreate.fulfilled, (state, action) => {
                const [user, isCreated] = action.payload;
                if (isCreated) {
                    console.log('user has been created')
                } else {
                    console.log('user has been found')
                }
                state.auth.orderUser = user;
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
                state.auth.orderUser = action.payload;
                if (action.payload.roles.includes('ROLE_ADMIN')) {
                    state.auth.isAdmin = true;
                }
            })
            .addCase(verifyUserAccess.rejected, (state, action) => {
                state.auth.userLoading = false;
                state.auth.isAuth = false;
                state.auth.currentUser = {};
                state.auth.isAdmin = false;
            });
    }
})

export default reducer;