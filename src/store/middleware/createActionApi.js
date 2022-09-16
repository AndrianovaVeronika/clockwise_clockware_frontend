import instance from "./instance";
import baseHeaders from "./headers";

export default {
    GET: (path) => async (_, thunkAPI) => {
        try {
            const response = await instance.get(path, {
                headers: {...baseHeaders}
            });
            return response.data || {};
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    },
    GET_BY_ID: (path) => async (id, thunkAPI) => {
        try {
            const response = await instance.get(`${path}/${id}`, {
                headers: {...baseHeaders}
            });
            return response.data || {};
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    },
    POST: (path) => async (newInstance, thunkAPI) => {
        try {
            const response = await instance.post(path, newInstance, {
                headers: {...baseHeaders}
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    },
    PUT: (path) => async ({id, ...updateValues}, thunkAPI) => {
        try {
            const response = await instance.put(`${path}/${id}`, updateValues, {
                headers: {...baseHeaders}
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    },
    DELETE: (path) => async (id, thunkAPI) => {
        try {
            const response = await instance.delete(`${path}/${id}`, {
                headers: {...baseHeaders}
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
}