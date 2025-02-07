import { toast } from "react-toastify";
import useApi from "./api";

export const API_URL = process.env.NODE_ENV === "production" ? "https://blog-5pvj.vercel.app" : "http://127.0.0.1:8000"


async function Post(slug: string){
    const api = useApi()

    try {
        const response = await api.post(slug)
        const data = await response.data

        return data

    } catch {
        toast.error("Error fetch post")
    }
}


async function GetPosts(params?:any) {

    try {
        const queryString = params 
            ? '?' + new URLSearchParams(params as Record<string, string>).toString() 
            : '';
        const response = await fetch( `${API_URL}/bpm/post/api/v1/posts/${queryString}`, { cache: 'no-cache'})
        const data = await response.json()
   
        return data

    } catch {
        toast.error("Error fetch posts")
    }
}

async function GetUsers(params?:any) {

    try {
        const queryString = params 
            ? '?' + new URLSearchParams(params as Record<string, string>).toString() 
            : '';

        const response = await fetch(`${API_URL}/bpm/user/api/v1/users/${queryString}`, {cache: 'no-cache'})
        const data = await response.json()

        return data

    } catch {
        toast.error("Error fetch users")
    }
}

async function GetUserDetail(username: string) {
    const api = useApi()

    try {
        const response = await api.getUserDetail(username)
        const data = await response.data

        return data

    } catch {
        toast.error("Error fetch users")
    }
}


async function GetCategories() {

    try {
        const response = await fetch(`${API_URL}/bpm/category/api/v1/categories/`, {cache: 'no-cache'})
        const data = await response.json()

        return data

    } catch {
        toast.error("Error fetch Categories")
    }
}

export {Post, GetPosts, GetUsers, GetUserDetail, GetCategories}