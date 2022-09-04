import {createSelector} from "@reduxjs/toolkit";

export const getOrdersSelector = createSelector((state) => state.orders, (state) => state.orders.ordersList);

export const getOrderByIdSelector = createSelector((state) => state.orders, (state) => state.orders.foundById);

export const getCurrentUserOrdersSelector = createSelector(state=>state.orders, state=>state.orders.currentUserOrders);

export const getCurrentMasterOrdersSelector = createSelector(state=>state.orders, state=>state.orders.currentMasterOrders);