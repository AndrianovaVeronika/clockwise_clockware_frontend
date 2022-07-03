import {createAsyncThunk} from "@reduxjs/toolkit";
import orders from '../constants/orders';
import createActionApi from "../middleware/createActionApi";

const api = createActionApi('orders');

export const getOrders = createAsyncThunk(orders.GET_ORDERS, api.GET);

export const addOrder = createAsyncThunk(orders.ADD_ORDER, api.POST);

export const updateOrder = createAsyncThunk(orders.UPDATE_ORDER, api.PUT);

export const deleteOrder = createAsyncThunk(orders.DELETE_ORDER, api.DELETE);