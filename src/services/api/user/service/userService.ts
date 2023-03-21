import {UserModel} from "../../user/model/userModel";
import {apiService, ApiService} from "../../apiGeneric/service/apiService";

class UserService {
    private apiService: ApiService;

    constructor() {
        this.apiService = apiService;
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
