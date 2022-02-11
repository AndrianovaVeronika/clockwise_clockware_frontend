import {combineReducers} from "redux";
import ordersReducer from './ordersReducer';
import mastersReducer from "./mastersReducer";
import citiesReducer from "./citiesReducer";
import clockTypesReducer from "./clockTypesReducer";

const rootReducer = combineReducers({
    orders: ordersReducer,
    masters: mastersReducer,
    cities: citiesReducer,
    clockTypes: clockTypesReducer
})

export default rootReducer;