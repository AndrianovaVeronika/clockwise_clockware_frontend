import {createAsyncThunk} from "@reduxjs/toolkit";
import instance from "../middleware/api";
import mail from "../constants/mail";

export const sendMail = createAsyncThunk(mail.SEND_MAIL, async (mailData, thunkAPI) => {
    try {
        const response = await instance.post('/api/mail', mailData);
        if (response.status === 201){
            return {message: 'Mail `ve been sent successfully'};
        }
        else {
            return {message: 'Error occurred. Mail `ve not been sent'};
        }
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
})