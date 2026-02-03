type Exhibit = {
    id: number;
    title: string;
    description?: string;
    authorId: number;
    createdAt: string;
};

type CreateExhibitPayload = {
    title: string;
    description?: string;
};

export type { Exhibit, CreateExhibitPayload };
