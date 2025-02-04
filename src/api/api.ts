import { LoginFormData, Refresh } from "@/types/type"
import useInterceptor from "./interceptor"


interface PostDataType {
    thumbnail: null;
    title: string;
    description: string;
    meta_title: string;
    meta_description: string;
    slug: string;
    tag?: number[];
    category: number;
    categoryName: string;
    related_article?: number[];
    // related_article_payload: number[];
    // tags_payload: number[]
}

const useApi = () => {
    const interceptor = useInterceptor()
    const api = {

        // POst
        posts: (params={}) => interceptor.get(`/bpm/post/api/v1/posts/`, {params: params}),
        post: (slug: string) => interceptor.get(`/bpm/post/api/v1/posts/${slug}/`),
        createPost: (data: PostDataType) => {
            return interceptor.post(`/bpm/post/api/v1/post-create/`, data)
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
        signup: (data: unknown) => interceptor.post(`/bpm/user/api/v1/signup/`, data),

        getAccessToken: (data: Refresh) => interceptor.post(`/bpm/user/api/v1/token/refresh/`, data),
        isAuthenticate: (token:string) => {
            const headers = {
                Authorization: `Bearer ${token}`,
              }
            return interceptor.get(`/bpm/user/api/v1/protected/`, { headers: headers })},

        // Category
        getCategories: () => interceptor.get(`/bpm/category/api/v1/categories/`),


        // tag
        getTags: () => interceptor.get(`/bpm/tag/api/v1/tags/`),


        // image
        createImage: (data:unknown) => {
            const customHeaders = {
                'Content-Type': 'multipart/form-data'
            };
            return interceptor.post(`/bpm/filemanager/api/v1/images/`, data, {headers: customHeaders} )},
        
    }
    return api
}

export default useApi