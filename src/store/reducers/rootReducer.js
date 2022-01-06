import {combineReducers} from "redux";
import ordersReducer from './ordersReducer';
import uiReducer from './uiReducer';

const rootReducer = combineReducers({
    orders: ordersReducer,
    ui: ordersUiReducer,
})

export default rootReducer;