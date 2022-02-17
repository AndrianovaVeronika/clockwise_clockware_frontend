import {combineReducers} from "redux";
import ordersReducer from './ordersReducer';
import mastersReducer from "./mastersReducer";
import citiesReducer from "./citiesReducer";
import clockTypesReducer from "./clockTypesReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    orders: ordersReducer,
    masters: mastersReducer,
    cities: citiesReducer,
    clockTypes: clockTypesReducer,
    auth: authReducer,
})

export default rootReducer;