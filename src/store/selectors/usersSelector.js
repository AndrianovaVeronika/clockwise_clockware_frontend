import {createSelector} from "@reduxjs/toolkit";

export const getUsersSelector = createSelector((state) => state.users, (state) => state.users.usersList);

export const getFilteredUsersSelector = createSelector((state) => state.users, (state) => state.users.usersFilteredList);