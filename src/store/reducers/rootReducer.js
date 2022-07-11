import {combineReducers} from "redux";
import ordersReducer from './ordersReducer';
import mastersReducer from "./mastersReducer";
import citiesReducer from "./citiesReducer";
import clockTypesReducer from "./clockTypesReducer";
import authReducer from "./authReducer";
import usersReducer from "./usersReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
    orders: ordersReducer,
    masters: mastersReducer,
    cities: citiesReducer,
    clockTypes: clockTypesReducer,
    auth: authReducer,
    users: usersReducer,
    errors: errorReducer
})

export default rootReducer;