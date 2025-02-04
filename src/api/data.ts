import { toast } from "react-toastify";
import useApi from "./api";

async function Post(slug: string){
    const api = useApi()

    try {
        const response = await api.post(slug)
        const data = await response.data
        if (!data) {
            return { notFound: true };
          }
        return data

    } catch {
        toast.error("Error fetch post")
    }
}


async function GetPosts(params?:object) {
    const api = useApi()

    try {
        const response = await api.posts(params)
        const data = await response.data
        if (!data) {
            return { notFound: true };
          }
        return data

    } catch {
        toast.error("Error fetch posts")
    }
}

async function GetUsers(params?:object) {
    const api = useApi()

    try {
        const response = await api.getUsers(params)
        const data = await response.data
        if (!data) {
            return { notFound: true };
          }
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
        if (!data) {
            return { notFound: true };
          }
        return data

    } catch {
        toast.error("Error fetch users")
    }
}


async function GetCategories() {
    const api = useApi()

    try {
        const response = await api.getCategories()
        const data = await response.data
        if (!data) {
            return { notFound: true };
          }
        return data

    } catch {
        toast.error("Error fetch Categories")
    }
}

export {Post, GetPosts, GetUsers, GetUserDetail, GetCategories}