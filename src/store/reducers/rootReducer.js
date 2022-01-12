import {combineReducers} from "redux";
import ordersReducer from './ordersReducer';
import mastersReducer from "./mastersReducer";
import citiesReducer from "./citiesReducer";

const rootReducer = combineReducers({
    orders: ordersReducer,
    masters: mastersReducer,
    cities: citiesReducer,
})

export default rootReducer;