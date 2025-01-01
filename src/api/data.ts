import useApi from "./api";

async function Post(slug: string){
    const api = useApi()

    try {
        const response = await api.post(slug)
        const data = response.data

        return data

    } catch {
        console.log("Error fetch post")
    }
}


async function GetPosts(params?:object) {
    const api = useApi()

    try {
        const response = await api.posts(params)
        const data = response.data

        return data

    } catch {
        console.log("Error fetch posts")
    }
}

async function GetUsers(params?:object) {
    const api = useApi()

    try {
        const response = await api.getUsers(params)
        const data = response.data

        return data

    } catch {
        console.log("Error fetch users")
    }
}

async function GetUserDetail(username: string) {
    const api = useApi()

    try {
        const response = await api.getUserDetail(username)
        const data = response.data

        return data

    } catch {
        console.log("Error fetch users")
    }
}


async function GetCategories() {
    const api = useApi()

    try {
        const response = await api.getCategories()
        const data = response.data

        return data

    } catch {
        console.log("Error fetch Categories")
    }
}

export {Post, GetPosts, GetUsers, GetUserDetail, GetCategories}