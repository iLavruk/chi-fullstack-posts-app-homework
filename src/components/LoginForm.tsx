import { Formik } from 'formik';
import { Alert, Button, Card, Form as AntForm, Input, Typography } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginUser } from '@/store/slices/userSlice';

type LoginValues = {
    username: string;
    password: string;
};

const validate = (values: LoginValues) => {
    const errors: Partial<Record<keyof LoginValues, string>> = {};

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

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((s) => s.user);

    return (
        <Card style={{ width: '100%', maxWidth: 420 }}>
            <Typography.Title level={3} style={{ marginBottom: 16 }}>
                Login
            </Typography.Title>
            {error && (
                <Alert
                    type="error"
                    message={error}
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}
            <Formik<LoginValues>
                initialValues={{ username: '', password: '' }}
                validate={validate}
                onSubmit={(values) => {
                    dispatch(loginUser({ username: values.username.trim(), password: values.password }));
                }}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <AntForm layout="vertical" onFinish={() => handleSubmit()}>
                        <AntForm.Item
                            label="Username"
                            validateStatus={touched.username && errors.username ? 'error' : ''}
                            help={touched.username && errors.username ? errors.username : null}
                        >
                            <Input
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="username"
                            />
                        </AntForm.Item>
                        <AntForm.Item
                            label="Password"
                            validateStatus={touched.password && errors.password ? 'error' : ''}
                            help={touched.password && errors.password ? errors.password : null}
                        >
                            <Input.Password
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="current-password"
                            />
                        </AntForm.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Login
                        </Button>
                    </AntForm>
                )}
            </Formik>
        </Card>
    );
};

export default LoginForm;
