type Exhibit = {
    id: number;
    title?: string;
    description?: string;
    imageUrl?: string;
    authorId?: number;
    createdAt?: string;
    user?: {
        username?: string;
    };
    commentCount?: number;
};

type CreateExhibitPayload = {
    description?: string;
    image: File;
};

export type { Exhibit, CreateExhibitPayload };
