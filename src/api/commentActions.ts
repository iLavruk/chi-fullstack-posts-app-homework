import { axiosInstance } from '@/api';
import type { Comment, CreateCommentPayload } from '@/types';

const normalizeList = (payload: unknown): Comment[] => {
    return Array.isArray(payload) ? (payload as Comment[]) : [];
};

const commentActions = {
    getByExhibit: async (exhibitId: number) => {
        const { data } = await axiosInstance.get<unknown>(`/api/exhibits/${exhibitId}/comments`);
        return normalizeList(data);
    },

    create: async (payload: CreateCommentPayload) => {
        const { data } = await axiosInstance.post<Comment>(
            `/api/exhibits/${payload.exhibitId}/comments`,
            { text: payload.text }
        );
        return data;
    },

    remove: async (exhibitId: number, commentId: number) => {
        await axiosInstance.delete<void>(`/api/exhibits/${exhibitId}/comments/${commentId}`);
    },
};

export default commentActions;
export type { Comment, CreateCommentPayload };
