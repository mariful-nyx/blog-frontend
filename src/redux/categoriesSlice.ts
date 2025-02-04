import useApi from "@/api/api";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Categories } from "@/types/type";
import { toast } from "react-toastify";


interface CategoryTypes {
    categories: Categories[];
    isLoaded: boolean;
}

const initialState:CategoryTypes = {
    categories: [{id: 1, name: ''}],
    isLoaded: false
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
            state.isLoaded = true
        }
    }
})

export const { setCategories } = categoriesSlice.actions

export const fetchCategories = () => async (dispatch:AppDispatch) => {
    const api = useApi()
    try {
        const response = await api.getCategories()
        const data = await response.data
        dispatch(setCategories(data))
    } catch {
        toast.error('Error fetching categories.')
    }
}

export default categoriesSlice.reducer