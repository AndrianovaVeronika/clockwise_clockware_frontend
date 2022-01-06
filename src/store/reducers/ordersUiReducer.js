import initialState from "../initialState";
import TOGGLE_ORDER_FORM from "../actions/toggle_order_form";

export default function ordersUiReducer(state = initialState.orders.ui, action){
    switch(action.type) {
        case TOGGLE_ORDER_FORM: {
            return {
                ...state, isOrderFormHidden: !state
            }
        }
        default: return state;
    }
}