import useApi from "@/api/api";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

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
    isLoaded: boolean;
}

const initialState: PostsType = {
    posts: [],
    isLoaded: false
}


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
            state.isLoaded = true
        }
    }
})


export const { setPosts } = postsSlice.actions


export const fetchPosts = () => async (dispatch:AppDispatch) => {
    const api = useApi()
    try {
        const response = await api.posts()
        dispatch(setPosts(response.data))
    } catch {
        console.log('Error fetch posts.')
    }
}

export default postsSlice.reducer