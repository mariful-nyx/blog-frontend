import axios, { AxiosResponse } from 'axios';

export const API_URL = process.env.NODE_ENV === "production" ? "https://blog-5pvj.vercel.app" : "https://blog-5pvj.vercel.app"


const useInterceptor = () => {
    // Create a new axios instance
    const axiosInstance = axios.create({
        baseURL: API_URL,
        timeout: 10000, // Adjust as per your needs
        headers: {
            'Content-Type': 'application/json',
            // Add other headers if needed
        },
    });

    // Request interceptor for adding headers or other configurations
    axiosInstance.interceptors.request.use(async (config) => {
        // Modify config as needed, such as adding headers
        // config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
        (error) => {
            // Handle request error
            return Promise.reject(error);
        }
    );

    // Response interceptor for handling responses or errors
    axiosInstance.interceptors.response.use(async (response: AxiosResponse) => {
        // Handle response data
        return response;
    },
        async (error:string) => {
            // Handle response errors
            return Promise.reject(error);
        }
    );
    return axiosInstance
}

export default useInterceptor;
