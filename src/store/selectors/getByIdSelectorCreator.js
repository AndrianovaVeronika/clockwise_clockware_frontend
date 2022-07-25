import {createSelector} from "@reduxjs/toolkit";

export const getByIdSelectorCreator = (model) => createSelector((state) => state[model], (state) => state[model].foundById);
