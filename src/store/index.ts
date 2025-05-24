import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./login/authSlice";
import userSlice from "./user/userSlice";
import contractSlice from "./finance/contractSlice";
export const store = configureStore({
    reducer: {
        authSlice,//es6语法
        userSlice,
        contractSlice,
    }
})