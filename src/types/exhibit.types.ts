type Exhibit = {
    id: number;
    title?: string;
    description?: string;
    image?: string;
    imageUrl?: string;
    authorId?: number;
    createdAt?: string;
};

type CreateExhibitPayload = {
    description?: string;
    image: File;
};

export type { Exhibit, CreateExhibitPayload };
