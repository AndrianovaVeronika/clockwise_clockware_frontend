import instance from "./instance";
import qs from "qs";

export default {
    GET: (path) => async (_, thunkAPI) => {
        try {
            const response = await instance.get(path);
            return response.data || {};
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    },
    GET_FILTERED: (path) => async (params, thunkAPI) => {
        try {
            const response = await instance.get(path, {
                params: params,
                paramsSerializer: params => {
                    return qs.stringify(params)
                }
            });
            return response.data || {};
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    },
    GET_BY_ID: (path) => async (id, thunkAPI) => {
        try {
            const response = await instance.get(`${path}/${id}`);
            return response.data || {};
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    },
    POST: (path) => async (newInstance, thunkAPI) => {
        try {
            const response = await instance.post(path, newInstance);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    },
    PUT: (path) => async ({id, ...updateValues}, thunkAPI) => {
        try {
            const response = await instance.put(`${path}/${id}`, updateValues);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    },
    DELETE: (path) => async (id, thunkAPI) => {
        try {
            const response = await instance.delete(`${path}/${id}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
}