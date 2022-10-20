import clockTypes from "../actions/clockTypes";
import store from "../store";

export const getAllClockTypes = async (filters) => {
    const action = await store.dispatch(clockTypes.getAll(filters));
    return action.payload;
};

export const getClockTypeById = async id => {
    const action = await store.dispatch(clockTypes.getById(id));
    return action.payload;
};