import {createSelector} from "@reduxjs/toolkit";

export const getMastersSelector = createSelector((state) => state.masters, (state) => state.masters.mastersList);

export const getFilteredMastersSelector = createSelector((state) => state.masters, (state) => state.masters.mastersFilteredList);

export const getAvailableMastersSelector = createSelector((state) => state.masters, (state) => state.masters?.availableMasters);