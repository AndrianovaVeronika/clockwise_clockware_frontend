import masters from "../actions/masters";
import store from "../store";

export const getAllMasters = async (filters) => {
    const action = await store.dispatch(masters.getAll(filters))
    return action.payload;
};

export const getAvailableMasters = async (orderToAdd) => {
    const action = await store.dispatch(masters.getAvailableMasters(orderToAdd))
    return action.payload;
};

export const getMasterById = async id => {
    const action = await store.dispatch(masters.getById(id))
    return action.payload;
};