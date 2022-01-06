import Handle_default_input_change from "../actions/handle_default_input_change.js";

function handle_value_change(value){
    return{
        type: Handle_default_input_change,
        newOrder: value
    };
}

export default handle_value_change;