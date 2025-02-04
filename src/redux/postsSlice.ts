import useApi from "@/api/api";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { toast } from "react-toastify";

interface Post {
    id: number;
    user: string;
    username: string;
    title: string;
    description: string;
    created: string;
    updated: string;
    tag: string;
    views: string;
    meta_title: string;
    meta_description: string;
    slug: string;
}

interface PostsType {
    posts: Post[];
    isPostsLoaded: boolean;
}

const initialState: PostsType = {
    posts: [],
    isPostsLoaded: false
}


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
            state.isPostsLoaded = true
        }
    }
})


export const { setPosts } = postsSlice.actions


export const fetchPosts = () => async (dispatch:AppDispatch) => {
    const api = useApi()
    try {
        const response = await api.posts({all_items:true})
        dispatch(setPosts(response.data))
    } catch {
        toast.error('Error fetch posts.')
    }
}

export default postsSlice.reducer