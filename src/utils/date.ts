const formatDateTime = (value?: string): string => {
    return value ? new Date(value).toLocaleString() : '';
};

export { formatDateTime };
