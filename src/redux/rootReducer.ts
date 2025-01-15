import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import categoriesReducer from './categoriesSlice'
import tagReducer from './tagSlice'
import postsReducer from './postsSlice'

const rootReducers = combineReducers({
    auth: authReducer,
    categories: categoriesReducer,
    tags: tagReducer,
    posts: postsReducer

})

export default rootReducers