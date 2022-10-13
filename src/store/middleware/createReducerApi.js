import {current} from "@reduxjs/toolkit";

export default {
    GET: (modelName) => (state, action) => {
        state[modelName][modelName + 'List'] = action.payload;
    },
    GET_FILTERED: (modelName) => (state, action) => {
        state[modelName][modelName + 'FilteredList'] = action.payload;
    },
    GET_BY_ID: (modelName) => (state, action) => {
        state[modelName]['foundById'] = action.payload;
    },
    ADD: (modelName) => (state, action) => {
        state[modelName][modelName + 'List'].push(action.payload);
    },
    UPDATE: (modelName) => (state, action) => {
        const list = current(state[modelName][modelName + 'List']);
        state[modelName][modelName + 'List'] = list.map(instance => instance.id === parseInt(action.payload.id) ? action.payload : instance);
    },
    DELETE: (modelName) => (state, action) => {
        const list = current(state[modelName][modelName + 'List']);
        state[modelName][modelName + 'List'] = list.filter(instance => instance.id !== parseInt(action.payload.id));
    }
}