import {createAsyncThunk} from "@reduxjs/toolkit";
import errors from "../constants/errors";

export const cleanErrors = createAsyncThunk(errors.CLEAN_ERRORS, async (model) => {
    return model;
});