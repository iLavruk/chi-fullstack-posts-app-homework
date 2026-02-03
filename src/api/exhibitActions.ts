import { axiosInstance } from '@/api';
import type { Exhibit, CreateExhibitPayload } from '@/types';

const normalizeList = (payload: unknown): Exhibit[] => {
    return Array.isArray(payload) ? (payload as Exhibit[]) : [];
};

const exhibitActions = {
    getAll: async () => {
        const { data } = await axiosInstance.get<unknown>('/api/exhibits');
        return normalizeList(data);
    },

    getMine: async () => {
        const { data } = await axiosInstance.get<unknown>('/api/exhibits/my-posts');
        return normalizeList(data);
    },

    getById: async (id: number) => {
        const { data } = await axiosInstance.get<Exhibit>(`/api/exhibits/post/${id}`);
        return data;
    },

    create: async (payload: CreateExhibitPayload) => {
        const formData = new FormData();
        formData.append('image', payload.image);
        if (payload.description) {
            formData.append('description', payload.description);
        }

        const { data } = await axiosInstance.post<Exhibit>('/api/exhibits', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return data;
    },

    remove: async (id: number) => {
        await axiosInstance.delete<void>(`/api/exhibits/${id}`);
    },
};

export default exhibitActions;
export type { Exhibit, CreateExhibitPayload };
