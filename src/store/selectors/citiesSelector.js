import {createSelector} from "@reduxjs/toolkit";

export const getCitiesSelector = createSelector((state) => state.cities, (state) => state.cities.citiesList);
export const getCityByIdSelector = createSelector((state) => state.cities, (state) => state.cities.foundById);