import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducer";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: rootReducers
})



export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch= () => useDispatch<AppDispatch>()

export default store