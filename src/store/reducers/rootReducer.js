import {combineReducers} from "redux";
import ordersReducer from './ordersReducer';

const rootReducer = combineReducers({
    orders: ordersReducer,
})

export default rootReducer;