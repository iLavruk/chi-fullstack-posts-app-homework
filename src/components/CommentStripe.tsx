import { useEffect, useState } from 'react';
import { Alert, Button, Input, List, Space, Typography } from 'antd';

import { commentActions } from '@/api';
import type { Comment as CommentType } from '@/types';
import Comment from './Comment';

type CommentStripeProps = {
    exhibitId: number;
};

const CommentStripe = ({ exhibitId }: CommentStripeProps) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [text, setText] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const loadComments = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await commentActions.getByExhibit(exhibitId);
            setComments(data);
        } catch {
            setError('Failed to load comments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadComments();
    }, [exhibitId]);

    const handleAdd = async () => {
        if (!text.trim()) return;

        try {
            await commentActions.create({ exhibitId, text: text.trim() });
            setText('');
            await loadComments();
        } catch {
            setError('Failed to add comment');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await commentActions.remove(exhibitId, id);
            await loadComments();
        } catch {
            setError('Failed to delete comment');
        }
    };

    return (
        <div style={{ marginTop: 12 }}>
            <Space size="middle">
                <Button type="link" onClick={() => setIsOpen((prev) => !prev)}>
                    {isOpen ? 'Hide' : 'Show'} comments ({comments.length})
                </Button>
                {isOpen && (
                    <Button size="small" onClick={loadComments} loading={loading}>
                        Refresh
                    </Button>
                )}
            </Space>
            {isOpen && (
                <div style={{ marginTop: 8 }}>
                    {error && (
                        <Alert
                            type="error"
                            message={error}
                            showIcon
                            style={{ marginBottom: 8 }}
                        />
                    )}
                    <Space orientation="vertical" style={{ width: '100%' }} size="small">
                        <Input.TextArea
                            rows={2}
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            placeholder="Write a comment..."
                        />
                        <Button type="primary" onClick={handleAdd} disabled={!text.trim()}>
                            Add comment
                        </Button>
                    </Space>
                    <Typography.Text
                        type="secondary"
                        style={{ display: 'block', marginTop: 12 }}
                    >
                        Comments
                    </Typography.Text>
                    <List
                        loading={loading}
                        dataSource={comments}
                        locale={{ emptyText: 'No comments yet' }}
                        rowKey="id"
                        renderItem={(comment) => (
                            <Comment comment={comment} onDelete={handleDelete} />
                        )}
                    />
                </div>
            )}
        </div>
    );
};

export default CommentStripe;
