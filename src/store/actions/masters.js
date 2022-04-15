import {createAsyncThunk} from "@reduxjs/toolkit";
import masters from '../constants/masters';
import createApi from "../middleware/createApi";

const api = createApi('masters');

export const getMasters = createAsyncThunk(masters.GET_MASTERS, api.GET);

export const addMaster = createAsyncThunk(masters.ADD_MASTER, api.POST);

export const updateMaster = createAsyncThunk(masters.UPDATE_MASTER, api.PUT);

export const deleteMaster = createAsyncThunk(masters.DELETE_MASTER, api.DELETE);