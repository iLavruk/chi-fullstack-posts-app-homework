import { axiosInstance } from '@/api';
import type { Exhibit, CreateExhibitPayload, PaginatedResponse } from '@/types';
import { DEFAULT_PAGE, PAGE_SIZE } from '@/constants';

const normalizeList = (payload: unknown): PaginatedResponse<Exhibit> => {
    if (Array.isArray(payload)) {
        return {
            data: payload as Exhibit[],
            page: 1,
            lastPage: 1,
            total: payload.length,
        };
    }

    if (payload && typeof payload === 'object') {
        const record = payload as Record<string, unknown>;
        if (Array.isArray(record.data)) {
            return {
                data: record.data as Exhibit[],
                page: typeof record.page === 'number' ? record.page : 1,
                lastPage: typeof record.lastPage === 'number' ? record.lastPage : 1,
                total: typeof record.total === 'number' ? record.total : record.data.length,
            };
        }
    }

    return {
        data: [],
        page: 1,
        lastPage: 1,
        total: 0,
    };
};

const exhibitActions = {
    getAll: async (page = DEFAULT_PAGE, limit = PAGE_SIZE) => {
        const { data } = await axiosInstance.get<unknown>('/api/exhibits', {
            params: { page, limit },
        });
        return normalizeList(data);
    },

    getMine: async (page = DEFAULT_PAGE, limit = PAGE_SIZE) => {
        const { data } = await axiosInstance.get<unknown>('/api/exhibits/my-posts', {
            params: { page, limit },
        });
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
