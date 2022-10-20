import {createSelector} from "@reduxjs/toolkit";

export const getMastersSelector = createSelector((state) => state.masters, (state) => state.masters.mastersList);