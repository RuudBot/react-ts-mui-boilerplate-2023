// src/api/ApiService.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import {TokenService} from "../../auth/service/tokenService";

export class ApiService {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: '/api',
            timeout: 30000, // Adjust the timeout as needed
        });

        this.instance.interceptors.request.use(this.requestInterceptor)
        this.instance.interceptors.response.use(this.responseInterceptor, this.errorInterceptor);
    }

    private requestInterceptor = (config:  InternalAxiosRequestConfig):  InternalAxiosRequestConfig => {
        const token = TokenService.getToken();
        if (token) {
            config.headers = config.headers || {}; // Set a default value for headers if it's undefined
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    };

    private responseInterceptor = (response: AxiosResponse) => {
        return response;
    };

    private errorInterceptor = (error: any) => {
        // Handle error cases like expired tokens, API errors, etc.
        return Promise.reject(error);
    };

    public get = <T = any>(url: string, config?:  InternalAxiosRequestConfig) => this.instance.get<T>(url, config);
    public post = <T = any>(url: string, data?: any, config?:  InternalAxiosRequestConfig) => this.instance.post<T>(url, data, config);
    public put = <T = any>(url: string, data?: any, config?:  InternalAxiosRequestConfig) => this.instance.put<T>(url, data, config);
    public patch = <T = any>(url: string, data?: any, config?:  InternalAxiosRequestConfig) => this.instance.patch<T>(url, data, config);
    public delete = <T = any>(url: string, config?:  InternalAxiosRequestConfig) => this.instance.delete<T>(url, config);
}

export const apiService = new ApiService();
