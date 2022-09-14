import {createSelector} from "@reduxjs/toolkit";

export const getCurrentUserSelector = createSelector((state) => state.auth, (state) => state.auth.currentUser);

export const isAuthUserSelector = createSelector((state) => state.auth, (state) => state.auth.isAuth);

export const isUserLoadingSelector = createSelector((state) => state.auth, (state) => state.auth.userLoading);

export const isAdminSelector = createSelector((state) => state.auth, (state) => state.auth.isAdmin);

export const isMasterSelector = createSelector((state) => state.auth, (state) => state.auth.isMasterAccount);
