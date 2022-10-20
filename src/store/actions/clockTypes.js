import {createAsyncThunk} from "@reduxjs/toolkit";
import clockTypes from "../constants/clockTypes";
import actionApi from "../middleware/createActionApi";

const getClockTypes = createAsyncThunk(clockTypes.GET_CLOCK_TYPES, actionApi.GET('/clockTypes'));

const getClockTypeById = createAsyncThunk(clockTypes.GET_CLOCK_TYPE_BY_ID, actionApi.GET_BY_ID('/clockTypes'));

export default {
    getAll: getClockTypes,
    getById: getClockTypeById
};