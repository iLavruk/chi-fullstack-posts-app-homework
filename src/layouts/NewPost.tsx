import { useState } from 'react';
import { Formik } from 'formik';
import { Alert, Button, Card, Form as AntForm, Input, Typography } from 'antd';

import { exhibitActions } from '@/api';
import { validateNewPost } from '@/utils';

type NewPostValues = {
    description: string;
    image: File | null;
};

const NewPost = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 24 }}>
            <Card style={{ width: '100%', maxWidth: 600 }}>
                <Typography.Title level={3} style={{ marginBottom: 16 }}>
                    Create a New Post
                </Typography.Title>
                {error && (
                    <Alert
                        type="error"
                        message={error}
                        showIcon
                        style={{ marginBottom: 16 }}
                    />
                )}
                {success && (
                    <Alert
                        type="success"
                        message={success}
                        showIcon
                        style={{ marginBottom: 16 }}
                    />
                )}
                <Formik<NewPostValues>
                    initialValues={{ description: '', image: null }}
                    validate={validateNewPost}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                        setError(null);
                        setSuccess(null);

                        try {
                            if (!values.image) {
                                setError('Image is required');
                                return;
                            }

                            await exhibitActions.create({
                                description: values.description.trim() || undefined,
                                image: values.image,
                            });
                            setSuccess('Post created successfully');
                            resetForm();
                        } catch {
                            setError('Failed to create post');
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                        setFieldTouched,
                    }) => (
                        <AntForm layout="vertical" onFinish={() => handleSubmit()}>
                            <AntForm.Item
                                label="Image"
                                validateStatus={touched.image && errors.image ? 'error' : ''}
                                help={touched.image && errors.image ? errors.image : null}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files?.[0] ?? null;
                                        setFieldValue('image', file);
                                        setFieldTouched('image', true, true);
                                    }}
                                    onBlur={handleBlur}
                                />
                            </AntForm.Item>
                            <AntForm.Item
                                label="Description"
                                validateStatus={touched.description && errors.description ? 'error' : ''}
                                help={touched.description && errors.description ? errors.description : null}
                            >
                                <Input.TextArea
                                    name="description"
                                    rows={4}
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </AntForm.Item>
                            <Button type="primary" htmlType="submit" loading={isSubmitting} block>
                                Publish
                            </Button>
                        </AntForm>
                    )}
                </Formik>
            </Card>
        </div>
    );
};

export default NewPost;
