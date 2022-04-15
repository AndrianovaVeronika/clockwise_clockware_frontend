import {createAsyncThunk} from "@reduxjs/toolkit";
import cities from "../constants/cities";
import createApi from "../middleware/createApi";

const api = createApi('cities');

export const getCities = createAsyncThunk(cities.GET_CITIES, api.GET);

export const addCity = createAsyncThunk(cities.ADD_CITY, api.POST);

export const updateCity = createAsyncThunk(cities.UPDATE_CITY, api.PUT);

export const deleteCity = createAsyncThunk(cities.DELETE_CITY, api.DELETE);