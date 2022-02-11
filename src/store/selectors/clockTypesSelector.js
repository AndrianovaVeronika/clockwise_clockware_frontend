import {createSelector} from "@reduxjs/toolkit";

export const getClockTypesSelector = createSelector((state) => state.clockTypes, (state) => state.clockTypes.clockTypesList);