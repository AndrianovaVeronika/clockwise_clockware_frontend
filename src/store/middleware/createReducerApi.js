import {current} from "@reduxjs/toolkit";

export default {
    GET: (path) => (state, action) => {
        state[path][path + 'List'] = action.payload;
    },
    GET_BY_ID: (path) => (state, action) => {
        state[path]['foundById'] = action.payload;
    },
    ADD: (path) => (state, action) => {
        state[path][path + 'List'].push(action.payload);
    },
    UPDATE: (path) => (state, action) => {
        const list = current(state[path][path + 'List']);
        state[path][path + 'List'] = list.map(instance => instance.id === parseInt(action.payload.id) ? action.payload : instance);
    },
    DELETE: (path) => (state, action) => {
        const list = current(state[path][path + 'List']);
        state[path][path + 'List'] = list.filter(instance => instance.id !== parseInt(action.payload.id));
    }
}