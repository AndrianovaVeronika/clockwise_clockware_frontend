import initialState from "../initialState";
import ADD_NEW_ORDER from "../actions/add_new_order";
import HANDLE_INPUT_CHANGE from "../actions/handle_input_change";

export default function ordersReducer(state = initialState.orders, action){
    switch(action.type) {
        case ADD_NEW_ORDER: {
            return {
                ...state,
                contactList: [...state.ordersList, ...state.newOrder]
            }
        }
        case HANDLE_INPUT_CHANGE: {
            return {
                ...state, newOrder: {
                    ...state.newOrder, ...action.payload
                }
            }
        }
        default: return state;
    }
}