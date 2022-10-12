import {createSelector} from "@reduxjs/toolkit";

export const getCitiesSelector = createSelector((state) => state.cities, (state) => state.cities.citiesList);

export const getFilteredCitiesSelector = createSelector((state) => state.cities, (state) => state.cities.citiesFilteredList);

export const getCityByIdSelector = createSelector((state) => state.cities, (state) => state.cities.foundById);