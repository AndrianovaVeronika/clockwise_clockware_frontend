import {createAsyncThunk} from "@reduxjs/toolkit";
import clockTypes from "../constants/clockTypes";
import actionApi from "../middleware/createActionApi";

export const getClockTypes = createAsyncThunk(clockTypes.GET_CLOCK_TYPES, actionApi.GET('/clockTypes'));
