import { List, Space, Typography } from 'antd';

import type { Comment as CommentType } from '@/types';

type CommentProps = {
    comment: CommentType;
    onDelete?: (id: number) => void;
};

const Comment = ({ comment, onDelete }: CommentProps) => {
    const createdAt = comment.createdAt ? new Date(comment.createdAt).toLocaleString() : '—';
    const authorLabel = comment.userName
        ? comment.userName
        : comment.authorId !== undefined
            ? `User ${comment.authorId}`
            : 'User';

    return (
        <List.Item
            actions={
                onDelete
                    ? [
                          <Typography.Link
                              key="delete"
                              onClick={() => onDelete(comment.id)}
                          >
                              Delete
                          </Typography.Link>,
                      ]
                    : undefined
            }
        >
            <Space orientation="vertical" size={0}>
                <Typography.Text strong>{authorLabel}</Typography.Text>
                <Typography.Paragraph style={{ marginBottom: 4 }}>
                    {comment.text}
                </Typography.Paragraph>
                {comment.createdAt && (
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                        {createdAt}
                    </Typography.Text>
                )}
            </Space>
        </List.Item>
    );
};

export default Comment;
