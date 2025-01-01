import useApi from "@/api/api";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Categories } from "@/types/type";


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
        console.log('Error fetching categories.')
    }
}

export default categoriesSlice.reducer