import { axiosInstance } from '@/api';
import { type AuthPayload, type AuthResponse } from '@/types';

const userActions = {
    login: async (payload: AuthPayload) => {
        const { data } = await axiosInstance.post<AuthResponse>('/auth/login', payload);
        return data;
    },

    register: async (payload: AuthPayload) => {
        const { data } = await axiosInstance.post<AuthResponse>('/users/register', payload);
        return data;
    },
};

export default userActions;
export type { AuthPayload, AuthResponse };
