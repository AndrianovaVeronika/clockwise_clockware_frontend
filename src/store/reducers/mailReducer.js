import initialState from "../initialState";
import {createSlice} from "@reduxjs/toolkit";
import {sendMail} from "../actions";

const {reducer} = createSlice({
    name: 'mail',
    initialState,
    reducers: {
        // omit existing reducers here
    },
    extraReducers(builder) {
        builder
            .addCase(sendMail.fulfilled, (state, action) => {
                console.log(action.payload.message);
            })
    }
})

export default reducer;