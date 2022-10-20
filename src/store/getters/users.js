import users from "../actions/users";
import store from "../store";

export const getAllUsers = async (filters) => {
    const action = await store.dispatch(users.getAll(filters))
    return action.payload;
};

export const getUserById = async id => {
    const action = await store.dispatch(users.getById(id))
    return action.payload;
};