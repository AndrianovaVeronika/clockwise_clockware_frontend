import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../middleware/api";
import cities from "../constants/cities";

export const getCities = createAsyncThunk(cities.GET_CITIES, async () => {
    try {
        const response = await instance.get('/cities');
        if (response.data) {
            return response.data;
        } else {
            console.log('getCities: Query screwed up');
            return {};
        }
    } catch (e) {
        console.log(e);
        console.log('getCities: Query screwed up with error');
        return {};
    }
})

export const getCityById = createAsyncThunk(cities.GET_CITY_BY_ID, async (id) => {
    try {
        const response = await instance.get('/cities/' + id);
        if (response.data) {
            return response.data;
        } else {
            console.log('getMasters: Query screwed up');
            return {};
        }
    } catch (e) {
        console.log('getMasters: Query screwed up with error');
        return {};
    }
})

export const addCity = createAsyncThunk(cities.ADD_CITY, async (newCity) => {
    try {
        const response = await instance.post('/cities', newCity);
        if (response.status === 201){
            return {status: 'addCity: new city added'};
        }
        else {
            return {status: 'addCity: smth went wrong (new city havent been added)'};
        }
    } catch (e) {
        return {status: '!ERROR'};
    }
})