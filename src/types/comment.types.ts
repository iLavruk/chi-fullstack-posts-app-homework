type Comment = {
    id: number;
    exhibitId?: number;
    authorId?: number;
    userName?: string;
    text: string;
    createdAt?: string;
};

type CreateCommentPayload = {
    exhibitId: number;
    text: string;
};

export type { Comment, CreateCommentPayload };
