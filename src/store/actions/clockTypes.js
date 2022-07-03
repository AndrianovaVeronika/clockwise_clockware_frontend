import {createAsyncThunk} from "@reduxjs/toolkit";
import clockTypes from "../constants/clockTypes";
import createActionApi from "../middleware/createActionApi";

const api = createActionApi('clocktypes');

export const getClockTypes = createAsyncThunk(clockTypes.GET_CLOCK_TYPES, api.GET)
