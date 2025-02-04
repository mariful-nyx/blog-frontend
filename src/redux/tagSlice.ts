import useApi from "@/api/api";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { Tag } from "@/types/type";
import { toast } from "react-toastify";


interface CategoryTypes {
    tags: Tag[];
    isTagsLoaded: boolean;
}

const initialState:CategoryTypes = {
    tags: [{id: 1, name: ''}],
    isTagsLoaded: false
}

const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags: (state, action) => {
            state.tags = action.payload
            state.isTagsLoaded = true
        }
    }
})

export const { setTags } = tagsSlice.actions

export const fetchTags = () => async (dispatch:AppDispatch) => {
    const api = useApi()
    try {
        const response = await api.getTags()
        const data = await response.data
        dispatch(setTags(data))
    } catch {
        toast.error('Error fetch tags !')
    }
}

export default tagsSlice.reducer