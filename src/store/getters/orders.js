import orders from "../actions/orders";
import store from "../store";

export const getAllOrders = async (filters) => {
    const action = await store.dispatch(orders.getAll(filters))
    return action.payload;
};

export const getCurrentMasterOrders = async (filters) => {
    const action = await store.dispatch(orders.getCurrentMasterOrders(filters))
    return action.payload;
};

export const getCurrentUserOrders = async (filters) => {
    const action = await store.dispatch(orders.getCurrentUserOrders(filters))
    return action.payload;
};

export const getOrderById = async id => {
    const action = await store.dispatch(orders.getById(id))
    return action.payload;
};