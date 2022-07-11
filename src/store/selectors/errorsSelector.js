import {createSelector} from "@reduxjs/toolkit";

export const getErrorsSelector = createSelector((state) => state.errors, (state) => {
    console.log(state.errors)
    return state.errors
});