import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import categoriesReducer from './categoriesSlice'


const rootReducers = combineReducers({
    auth: authReducer,
    categories: categoriesReducer
})

export default rootReducers