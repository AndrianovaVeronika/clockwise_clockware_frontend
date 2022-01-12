import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../middleware/api";
import cities from "../constants/cities";

export const getCities = createAsyncThunk(cities.GET_CITIES, async () => {
    try {
        console.log('Going to backend');
        const response = await instance.get('/cities');
        if (response.data) {
            console.log('oh, yes, query works');
            return response.data;
        } else {
            console.log('Query screwed up');
            return {};
        }
    } catch (e) {
        console.log(e);
        console.log('Query screwed up with error');
        return {};
    }
})

export const addCity = createAsyncThunk(cities.ADD_CITY, async (newCity) => {
    try {
        const response = await instance.post('/cities', newCity);

        if (response.status === 201){
            return {status: 'new city added'};
        }
        else {
            return {status: 'smth went wrong (new city havent been added)'};
        }
    } catch (e) {
        console.log('!ERROR', e);
        return {status: '!ERROR'};
    }
})