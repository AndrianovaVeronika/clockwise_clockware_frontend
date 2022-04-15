import {createAsyncThunk} from "@reduxjs/toolkit";
import clockTypes from "../constants/clockTypes";
import createApi from "../middleware/createApi";

const api = createApi('clocktypes');

export const getClockTypes = createAsyncThunk(clockTypes.GET_CLOCK_TYPES, api.GET)
