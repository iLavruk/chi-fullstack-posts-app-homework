import { axiosInstance } from '@/api';
import type { Exhibit, CreateExhibitPayload } from '@/types';

const exhibitActions = {
    getAll: async () => {
        const { data } = await axiosInstance.get<Exhibit[]>('/exhibits');
        return data;
    },

    getMine: async () => {
        const { data } = await axiosInstance.get<Exhibit[]>('/exhibits/my');
        return data;
    },

    getById: async (id: number) => {
        const { data } = await axiosInstance.get<Exhibit>(`/exhibits/${id}`);
        return data;
    },

    create: async (payload: CreateExhibitPayload) => {
        const { data } = await axiosInstance.post<Exhibit>('/exhibits', payload);
        return data;
    },

    remove: async (id: number) => {
        await axiosInstance.delete<void>(`/exhibits/${id}`);
    },
};

export default exhibitActions;
export type { Exhibit, CreateExhibitPayload };
