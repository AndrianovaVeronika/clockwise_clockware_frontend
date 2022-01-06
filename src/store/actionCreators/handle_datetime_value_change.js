import HANDLE_DATETIME_VALUE_CHANGE from "../actions/handle_datetime_value__change";

function handle_datetime_value_change(value){
    return{
        type: HANDLE_DATETIME_VALUE_CHANGE,
        newOrder: value
    };
}

export default handle_datetime_value_change;