import {combineReducers} from "redux";
import ordersReducer from './ordersReducer';
import mastersReducer from "./mastersReducer";

const rootReducer = combineReducers({
    orders: ordersReducer,
    masters: mastersReducer,
})

export default rootReducer;