import {current} from "@reduxjs/toolkit";
import _ from "lodash";

export default (model) => {
    return (state, action) => {
        console.log('on reject ' + model)
        const errors = current(state.errors[model]);
        if (_.isEmpty(errors.filter(err => err.message === action.payload.message))) {
            state.errors[model].push(action.payload);
        }
    }
}