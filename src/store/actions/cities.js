import {createAsyncThunk} from "@reduxjs/toolkit";
import cities from "../constants/cities";
import actionApi from "../middleware/createActionApi";

const getCities = createAsyncThunk(cities.GET_CITIES, actionApi.GET('/cities'));

const getFilteredCities = createAsyncThunk(cities.GET_FILTERED_CITIES, actionApi.GET_FILTERED('/cities'));

const getCityById = createAsyncThunk(cities.GET_CITY_BY_ID, actionApi.GET_BY_ID('/cities'));

const addCity = createAsyncThunk(cities.ADD_CITY, actionApi.POST('/cities'));

const updateCity = createAsyncThunk(cities.UPDATE_CITY, actionApi.PUT('/cities'));

const deleteCity = createAsyncThunk(cities.DELETE_CITY, actionApi.DELETE('cities'));

export default {
    getAll: getCities,
    getFiltered: getFilteredCities,
    getById: getCityById,
    add: addCity,
    update: updateCity,
    delete: deleteCity
};