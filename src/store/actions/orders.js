import {createAsyncThunk} from "@reduxjs/toolkit";
import orders from '../constants/orders';
import createActionApi from "../middleware/createActionApi";

const api = createActionApi('orders');

const getOrders = createAsyncThunk(orders.GET_ORDERS, api.GET);

const getOrderById = createAsyncThunk(orders.GET_ORDER_BY_ID, api.GET_BY_ID)

const addOrder = createAsyncThunk(orders.ADD_ORDER, api.POST);

const updateOrder = createAsyncThunk(orders.UPDATE_ORDER, api.PUT);

const deleteOrder = createAsyncThunk(orders.DELETE_ORDER, api.DELETE);

export default {
    getAll: getOrders,
    getById: getOrderById,
    add: addOrder,
    update: updateOrder,
    delete: deleteOrder
}