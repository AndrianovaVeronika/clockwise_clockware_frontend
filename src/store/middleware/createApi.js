import instance from "./instance";
import {logOut} from "../actions/auth";

export default (modelName) => {
    return {
        GET: async (_, thunkAPI) => {
            try {
                const response = await instance.get('/' + modelName);
                return response.data || {};
            } catch (e) {
                return thunkAPI.rejectWithValue(e);
            }
        },
        POST: async (newInstance, thunkAPI) => {
            try {
                const response = await instance.post('/' + modelName, newInstance);
                return response.data;
            } catch (e) {
                return thunkAPI.rejectWithValue(e);
            }
        },
        PUT: async ({id, ...updateValues}, thunkAPI) => {
            try {
                const response = await instance.put('/' + modelName + '/' + id, updateValues);
                return response.data;
            } catch (e) {
                return thunkAPI.rejectWithValue(e);
            }
        },
        DELETE: async (instanceId, thunkAPI) => {
            try {
                const response = await instance.delete('/' + modelName + '/' + instanceId);
                return response.data;
            } catch (e) {
                return thunkAPI.rejectWithValue(e);
            }
        }
    }
}