import {createAsyncThunk} from "@reduxjs/toolkit";
import cities from "../constants/cities";
import createActionApi from "../middleware/createActionApi";

const api = createActionApi('cities');

export const getCities = createAsyncThunk(cities.GET_CITIES, api.GET);

export const getCityById = createAsyncThunk(cities.GET_CITY_BY_ID, api.GET_BY_ID);

export const addCity = createAsyncThunk(cities.ADD_CITY, api.POST);

export const updateCity = createAsyncThunk(cities.UPDATE_CITY, api.PUT);

export const deleteCity = createAsyncThunk(cities.DELETE_CITY, api.DELETE);