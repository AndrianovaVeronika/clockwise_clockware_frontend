import {createSelector} from "@reduxjs/toolkit";

export const getOrdersSelector = createSelector((state) => state.orders, (state) => state.orders.ordersList);