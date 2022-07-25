import {current} from "@reduxjs/toolkit";

export default (modelName) => {
    return {
        GET: (state, action) => {
            state[modelName][modelName + 'List'] = action.payload;
        },
        GET_BY_ID: (state, action) => {
            state[modelName]['foundById'] = action.payload;
        },
        ADD: (state, action) => {
            state[modelName][modelName + 'List'].push(action.payload);
        },
        UPDATE: (state, action) => {
            const list = current(state[modelName][modelName + 'List']);
            state[modelName][modelName + 'List'] = list.map(instance => instance.id === parseInt(action.payload.id) ? action.payload : instance);
        },
        DELETE: (state, action) => {
            const list = current(state[modelName][modelName + 'List']);
            state[modelName][modelName + 'List'] = list.filter(instance => instance.id !== parseInt(action.payload.id));
        }
    }
}