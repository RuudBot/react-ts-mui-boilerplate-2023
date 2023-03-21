import {AuthResponse, LoginData} from "../model/authModel";
import {apiService} from "../../apiGeneric/service/apiService";
import {TokenService} from "./tokenService";

export const AuthService = {
    async login(data: LoginData): Promise<string> {
        const response = await apiService.post<AuthResponse>('/login', data);
        const token = response.data.token;
        TokenService.setToken(token);
        return token;
    },

    async logout() {
        TokenService.clearToken();
        // Perform additional logout logic if needed
    },

    isAuthenticated() {
        return TokenService.getToken() !== null;
    },
};
