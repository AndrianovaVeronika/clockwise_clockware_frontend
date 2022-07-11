import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {addCity, updateCity} from "../actions/cities";
import createRejectionAction from "../middleware/createRejectionAction";
import {addOrder, updateOrder} from "../actions/orders";
import {signIn, signUp} from "../actions/auth";
import {addMaster, updateMaster} from "../actions/masters";
import {addUser, updateUser} from "../actions/users";

const {reducer} = createSlice({
    name: 'errors',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(addCity.rejected, createRejectionAction('cities'))
            .addCase(updateCity.rejected, createRejectionAction('cities'))
            .addCase(addOrder.rejected, createRejectionAction('orders'))
            .addCase(updateOrder.rejected, createRejectionAction('orders'))
            .addCase(signIn.rejected, createRejectionAction('auth'))
            .addCase(signUp.rejected, createRejectionAction('auth'))
            .addCase(addMaster.rejected, createRejectionAction('masters'))
            .addCase(updateMaster.rejected, createRejectionAction('masters'))
            .addCase(addUser.rejected, createRejectionAction('users'))
            .addCase(updateUser.rejected, createRejectionAction('users'))
            .addDefaultCase((state, action) => {
                return state;
            })
    }
})

export default reducer;