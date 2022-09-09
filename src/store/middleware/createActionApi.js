import instance from "./instance";
import baseHeaders from "./headers";

export default {
    GET: (path) => async (_, thunkAPI) => {
        try {
            const response = await instance.get(path, {
                headers: {
                    'x-access-token': sessionStorage.getItem('TOKEN')
                }
            });
            return response.data || {};
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    },
    GET_BY_ID: (path) => async (id, thunkAPI) => {
        try {
            const response = await instance.get(path + '/' + id, {baseHeaders});
            return response.data || {};
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    },
    POST: (path) => async (newInstance, thunkAPI) => {
        try {
            const response = await instance.post(path, newInstance, {baseHeaders});
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    },
    PUT: (path) => async ({id, ...updateValues}, thunkAPI) => {
        try {
            console.log(updateValues)
            const response = await instance.put(path + '/' + id, updateValues, {baseHeaders});
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    },
    DELETE: (path) => async (id, thunkAPI) => {
        try {
            const response = await instance.delete(path + '/' + id, {baseHeaders});
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data)
        }
    }
}