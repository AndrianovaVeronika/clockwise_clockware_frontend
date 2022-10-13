import {createAsyncThunk} from "@reduxjs/toolkit";
import orders from '../constants/orders';
import actionApi from "../middleware/createActionApi";

const getOrders = createAsyncThunk(orders.GET_ORDERS, actionApi.GET('/orders'));

const getFilteredOrders = createAsyncThunk(orders.GET_FILTERED_ORDERS, actionApi.GET_FILTERED('/orders'));

const getOrderById = createAsyncThunk(orders.GET_ORDER_BY_ID, actionApi.GET_BY_ID('/orders'))

const addOrder = createAsyncThunk(orders.ADD_ORDER, actionApi.POST('/orders'));

const updateOrder = createAsyncThunk(orders.UPDATE_ORDER, actionApi.PUT('/orders'));

const deleteOrder = createAsyncThunk(orders.DELETE_ORDER, actionApi.DELETE('/orders'));

const getCurrentUserOrders = createAsyncThunk(orders.GET_CURRENT_USERS_ORDERS, actionApi.GET_FILTERED('/current_user/orders'));

const getCurrentMasterOrders = createAsyncThunk(orders.GET_CURRENT_MASTERS_ORDERS, actionApi.GET_FILTERED('/current_master/orders'));

const updateMasterOrderById = createAsyncThunk(orders.UPDATE_CURRENT_MASTER_ORDER, actionApi.PUT('/master/orders'))

const rateOrder = createAsyncThunk(orders.RATE_ORDER, actionApi.PUT('/rate/order'));

export default {
    getAll: getOrders,
    getFiltered: getFilteredOrders,
    getById: getOrderById,
    add: addOrder,
    update: updateOrder,
    delete: deleteOrder,
    getCurrentUserOrders: getCurrentUserOrders,
    getCurrentMasterOrders: getCurrentMasterOrders,
    updateMasterOrderById: updateMasterOrderById,
    rateOrder
};