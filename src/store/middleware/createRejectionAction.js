import {current} from "@reduxjs/toolkit";
import _ from "lodash";

const createRejectionAction = (model) => {
    return (state, action) => {
        const errors = current(state.errors[model]);
        if (_.isEmpty(errors.filter(err => err.message === action.payload.message))) {
            state.errors[model].push(action.payload);
        }
    }
}

export default createRejectionAction;