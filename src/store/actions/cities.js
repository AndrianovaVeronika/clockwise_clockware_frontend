import {createAsyncThunk} from "@reduxjs/toolkit";
import cities from "../constants/cities";
import createActionApi from "../middleware/createActionApi";

const api = createActionApi('cities');

const getCities = createAsyncThunk(cities.GET_CITIES, api.GET);

const getCityById = createAsyncThunk(cities.GET_CITY_BY_ID, api.GET_BY_ID);

const addCity = createAsyncThunk(cities.ADD_CITY, api.POST);

const updateCity = createAsyncThunk(cities.UPDATE_CITY, api.PUT);

const deleteCity = createAsyncThunk(cities.DELETE_CITY, api.DELETE);

export default {
    getAll: getCities,
    getById: getCityById,
    add: addCity,
    update: updateCity,
    delete: deleteCity
}