import {createAsyncThunk} from "@reduxjs/toolkit";
import masters from '../constants/masters';
import actionApi from "../middleware/createActionApi";

const getMasters = createAsyncThunk(masters.GET_MASTERS, actionApi.GET('/masters'));

const getMasterById = createAsyncThunk(masters.GET_MASTER_BY_ID, actionApi.GET_BY_ID('/masters'));

const addMaster = createAsyncThunk(masters.ADD_MASTER, actionApi.POST('/masters'));

const updateMaster = createAsyncThunk(masters.UPDATE_MASTER, actionApi.PUT('/masters'));

const deleteMaster = createAsyncThunk(masters.DELETE_MASTER, actionApi.DELETE('/masters'));

const getAvailableMasters = createAsyncThunk(masters.GET_AVAILABLE_MASTERS, actionApi.GET('/available/masters'));

export default {
    getAll: getMasters,
    getById: getMasterById,
    add: addMaster,
    update: updateMaster,
    delete: deleteMaster,
    getAvailableMasters: getAvailableMasters
};