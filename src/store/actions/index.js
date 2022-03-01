import {addOrder, getOrders} from "./orders";
import {addMaster, getMasters} from "./masters";
import {addCity, getCities} from "./cities";
import {getClockTypes} from "./clockTypes";
import {signIn, signUp, verifyUserAccess} from "./auth";
import {getUsers} from './users';
import {sendMail} from "./mail";

export {
    getOrders,
    addOrder,
    getMasters,
    addMaster,
    getCities,
    addCity,
    getClockTypes,
    signIn,
    signUp,
    getUsers,
    verifyUserAccess,
    sendMail
};