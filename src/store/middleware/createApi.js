import instance from "./instance";
import {current} from "@reduxjs/toolkit";

export const createActionApi = (modelName) => {
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

export const createReducerApi = (modelName) => {
    return {
        GET: (state, action) => {
            state[modelName][modelName + 'List'] = action.payload;
        },
        ADD: (state, action) => {
            console.log(action.payload)
            state[modelName][modelName + 'List'].push(action.payload);
        },
        UPDATE: (state, action) => {
            console.log(action.payload)
            const list = current(state[modelName][modelName + 'List']);
            state[modelName][modelName + 'List'] = list.map(instance => instance.id === parseInt(action.payload.id) ? action.payload : instance);
        },
        DELETE: (state, action) => {
            const list = current(state[modelName][modelName + 'List']);
            state[modelName][modelName + 'List'] = list.filter(instance => instance.id !== parseInt(action.payload.id));
        },
        REJECTED: (state, action) => {
            console.log(action.payload.message);
        },
    }
}