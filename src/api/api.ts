import useInterceptor from "./interceptor"



const useApi = () => {
    const interceptor = useInterceptor()
    const api = {

        // POst
        posts: (params={}) => interceptor.get(`/bpm/post/api/v1/posts/`, {params: params}),
        post: (slug: string) => interceptor.get(`/bpm/post/api/v1/posts/${slug}/`),

        // user
        getUsers: (params={}) => interceptor.get(`/bpm/user/api/v1/users/`, { params: params }),
        getUserDetail: (username: string) => interceptor.get(`/bpm/user/api/v1/users/${username}/`),

        // Category
        getCategories: () => interceptor.get(`/bpm/category/api/v1/categories/`),
    }
    return api
}

export default useApi