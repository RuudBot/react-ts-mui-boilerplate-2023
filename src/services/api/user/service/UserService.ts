import {UserModel} from "../model/UserModel";
import {ApiService} from "../../apiGeneric/service/ApiService";

class UserService {
    private apiService: ApiService;

    constructor() {
        this.apiService = new ApiService();
    }

    public async getUsers(): Promise<UserModel[]> {
        const response = await this.apiService.get<UserModel[]>('/users');
        return response.data;
    }

    public async getUser(id: number): Promise<UserModel> {
        const response = await this.apiService.get<UserModel>(`/users/${id}`);
        return response.data;
    }

    public async createUser(user: Omit<UserModel, 'id'>): Promise<UserModel> {
        const response = await this.apiService.post<UserModel>('/users', user);
        return response.data;
    }

    public async updateUser(user: UserModel): Promise<UserModel> {
        const response = await this.apiService.put<UserModel>(`/users/${user.id}`, user);
        return response.data;
    }

    public async deleteUser(id: number): Promise<void> {
        await this.apiService.delete(`/users/${id}`);
    }
}

export const userService = new UserService();
