import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../middleware/api";
import mail from "../constants/mail";

export const sendMail = createAsyncThunk(mail.SEND_MAIL, async (mailData, thunkAPI) => {
    try {
        const response = await instance.post('/api/mail', mailData);
        return response.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
})