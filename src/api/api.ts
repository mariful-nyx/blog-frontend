import { LoginFormData, Refresh } from "@/types/type"
import useInterceptor from "./interceptor"
import Cookies from "js-cookie"


const useApi = () => {
    const interceptor = useInterceptor()
    const api = {

        // POst
        posts: (params={}) => interceptor.get(`/bpm/post/api/v1/posts/`, {params: params}),
        post: (slug: string) => interceptor.get(`/bpm/post/api/v1/posts/${slug}/`),
        createPost: (data: unknown) => {
            const headers = {
                'Content-Type': 'multipart/form-datan',
                'Authorization': `Bearer ${Cookies.get('bpmAccessToken')}`,
            }
            return interceptor.post(`/bpm/post/api/v1/post-create/`, data, {headers: headers})
        },

        // user
        getUsers: (params={}) => interceptor.get(`/bpm/user/api/v1/users/`, { params: params }),
        updateProfile: (username:string, data:unknown) => {
            const customHeaders = {
                'Content-Type': 'multipart/form-data'
            };
            return interceptor.put(`/bpm/user/api/v1/users/${username}/`, data, {headers: customHeaders})},
        getUserDetail: (username: string) => interceptor.get(`/bpm/user/api/v1/users/${username}/`),
        login: (data: LoginFormData) => interceptor.post(`/bpm/user/api/v1/login/`, data),
        getAccessToken: (data: Refresh) => interceptor.post(`/bpm/user/api/v1//token/refresh/`, data),
        isAuthenticate: (token:string) => {
            const headers = {
                Authorization: `Bearer ${token}`,
              }
            return interceptor.get(`/bpm/user/api/v1/protected/`, { headers: headers })},

        // Category
        getCategories: () => interceptor.get(`/bpm/category/api/v1/categories/`),
        
    }
    return api
}

export default useApi