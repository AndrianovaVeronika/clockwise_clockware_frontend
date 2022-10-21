import cities from "../actions/cities";
import store from "../store";

export const getAllCities = async (filters) => {
    const action = await store.dispatch(cities.getAll(filters));
    return action.payload;
};

export const getCityById = async id => {
    const action = await store.dispatch(cities.getById(id));
    return action.payload;
};