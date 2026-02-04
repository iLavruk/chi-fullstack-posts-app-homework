import { Formik } from 'formik';
import { Alert, Button, Card, Form as AntForm, Input, Typography } from 'antd';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerUser } from '@/store/slices/userSlice';
import { validateAuth } from '@/utils';

type RegisterValues = {
    username: string;
    password: string;
};

const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((s) => s.user);

    return (
        <Card style={{ width: '100%', maxWidth: 420 }}>
            <Typography.Title level={3} style={{ marginBottom: 16 }}>
                Register
            </Typography.Title>
            {error && (
                <Alert
                    type="error"
                    message={error}
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}
            <Formik<RegisterValues>
                initialValues={{ username: '', password: '' }}
                validate={validateAuth}
                onSubmit={(values) => {
                    dispatch(registerUser({ username: values.username.trim(), password: values.password }));
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
                                autoComplete="new-password"
                            />
                        </AntForm.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Register
                        </Button>
                    </AntForm>
                )}
            </Formik>
        </Card>
    );
};

export default RegisterForm;
