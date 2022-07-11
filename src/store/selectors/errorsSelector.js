import {createSelector} from "@reduxjs/toolkit";

export const getErrorsSelector = createSelector((state) => state.errors, (state) => state.errors);