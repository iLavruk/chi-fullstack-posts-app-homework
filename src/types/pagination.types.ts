type PaginatedResponse<T> = {
    data: T[];
    page: number;
    lastPage: number;
    total: number;
};

export type { PaginatedResponse };
