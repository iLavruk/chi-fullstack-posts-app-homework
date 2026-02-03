import { axiosInstance } from '@/api';
import type { Comment, CreateCommentPayload } from '@/types';

const commentActions = {
    getByExhibit: async (exhibitId: number) => {
        const { data } = await axiosInstance.get<Comment[]>(`/comments/by-exhibit/${exhibitId}`);
        return data;
    },

    create: async (payload: CreateCommentPayload) => {
        const { data } = await axiosInstance.post<Comment>('/comments', payload);
        return data;
    },

    remove: async (id: number) => {
        await axiosInstance.delete<void>(`/comments/${id}`);
    },
};

export default commentActions;
export type { Comment, CreateCommentPayload };
