type AuthValues = {
    username: string;
    password: string;
};

type NewPostValues = {
    description: string;
    image: File | null;
};

const validateAuth = (values: AuthValues) => {
    const errors: Partial<Record<keyof AuthValues, string>> = {};

    if (!values.username.trim()) {
        errors.username = 'Username is required';
    } else if (values.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }

    return errors;
};

const validateNewPost = (values: NewPostValues) => {
    const errors: Partial<Record<keyof NewPostValues, string>> = {};

    if (!values.image) {
        errors.image = 'Image is required';
    }

    if (!values.description.trim()) {
        errors.description = 'Description is required';
    } else if (values.description.trim().length < 5) {
        errors.description = 'Description must be at least 5 characters';
    }

    return errors;
};

export { validateAuth, validateNewPost };
