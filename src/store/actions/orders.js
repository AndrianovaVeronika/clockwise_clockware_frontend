import {createAsyncThunk} from "@reduxjs/toolkit";
import orders from '../constants/orders';
import actionApi from "../middleware/createActionApi";

const getOrders = createAsyncThunk(orders.GET_ORDERS, actionApi.GET('/orders'));

const getOrderById = createAsyncThunk(orders.GET_ORDER_BY_ID, actionApi.GET_BY_ID('/orders'))

const addOrder = createAsyncThunk(orders.ADD_ORDER, actionApi.POST('/orders'));

const updateOrder = createAsyncThunk(orders.UPDATE_ORDER, actionApi.PUT('/orders'));

const deleteOrder = createAsyncThunk(orders.DELETE_ORDER, actionApi.DELETE('/orders'));

const getCurrentUserOrders = createAsyncThunk(orders.GET_CURRENT_USERS_ORDERS, actionApi.GET('/current_user/orders'));

const getCurrentMasterOrders = createAsyncThunk(orders.GET_CURRENT_MASTERS_ORDERS, actionApi.GET('/current_master/orders'));

const updateMasterOrderById = createAsyncThunk(orders.UPDATE_CURRENT_MASTER_ORDER, actionApi.PUT('/master/orders'))

const rateOrder = createAsyncThunk(orders.RATE_ORDER, actionApi.PUT('/rate/order'));

export default {
    getAll: getOrders,
    getById: getOrderById,
    add: addOrder,
    update: updateOrder,
    delete: deleteOrder,
    getCurrentUserOrders: getCurrentUserOrders,
    getCurrentMasterOrders: getCurrentMasterOrders,
    updateMasterOrderById: updateMasterOrderById,
    rateOrder
};