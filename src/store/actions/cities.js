import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../middleware/api";
import cities from "../constants/cities";

export const getCities = createAsyncThunk(cities.GET_CITIES, async (_, thunkAPI) => {
    try {
        const response = await instance.get('/api/cities');
        return response.data || {};
    } catch (e) {
        console.log(e);
        console.log('getCities: Query screwed up with error');
        return thunkAPI.rejectWithValue(e);
    }
});

export const addCity = createAsyncThunk(cities.ADD_CITY, async (newCity, thunkAPI) => {
    try {
        const accessToken = sessionStorage.getItem('TOKEN');
        const response = await instance.post('/api/cities', newCity, {
            headers: {
                'x-access-token': accessToken
            }
        });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const updateCity = createAsyncThunk(cities.UPDATE_CITY, async ({id, ...updateValue}, thunkAPI) => {
    try {
        const accessToken = sessionStorage.getItem('TOKEN');
        const response = await instance.put('api/cities/' + id, updateValue, {
            headers: {
                'x-access-token': accessToken
            }
        });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteCity = createAsyncThunk(cities.DELETE_CITY, async (cityId, thunkAPI) => {
    try {
        const accessToken = sessionStorage.getItem('TOKEN');
        const response = await instance.delete('api/cities/' + cityId, {
            headers: {
                'x-access-token': accessToken
            }
        });
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});