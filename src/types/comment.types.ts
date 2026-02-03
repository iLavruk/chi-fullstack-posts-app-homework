type Comment = {
    id: number;
    exhibitId: number;
    authorId: number;
    text: string;
    createdAt: string;
};

type CreateCommentPayload = {
    exhibitId: number;
    text: string;
};

export type { Comment, CreateCommentPayload };
