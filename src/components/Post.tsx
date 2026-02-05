import { Button, Card, Space, Tag, Typography } from 'antd';

import type { Exhibit } from '@/types';
import { API_URL } from '@/constants';
import { formatDateTime } from '@/utils';
import CommentStripe from './CommentStripe';

type PostProps = {
    exhibit: Exhibit;
    onDelete?: (id: number) => void;
    showComments?: boolean;
};

const Post = ({ exhibit, onDelete, showComments = true }: PostProps) => {
    const createdAt = formatDateTime(exhibit.createdAt);
    const title = exhibit.title ?? exhibit.description ?? `Exhibit #${exhibit.id}`;
    const description =
        exhibit.title && exhibit.description ? exhibit.description : undefined;

    const imageSrc = exhibit.imageUrl ? `${API_URL}${exhibit.imageUrl}` : undefined;

    return (
        <Card style={{ width: '100%' }}>
            <Space orientation="vertical" size={8} style={{ width: '100%' }}>
                <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography.Title level={4} style={{ margin: 0 }}>
                        {title}
                    </Typography.Title>
                    <Tag color="blue">#{exhibit.id}</Tag>
                </Space>
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt={title}
                        style={{ width: '100%', maxHeight: 320, objectFit: 'cover', borderRadius: 6 }}
                    />
                )}
                {description && (
                    <Typography.Paragraph style={{ marginBottom: 0 }}>
                        {description}
                    </Typography.Paragraph>
                )}
                <Space size="large" style={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography.Text type="secondary">
                        {exhibit.user?.username
                            ? `User: ${exhibit.user.username}`
                            : exhibit.authorId !== undefined
                                ? `Author ID: ${exhibit.authorId}`
                                : 'User: —'}
                    </Typography.Text>
                    <Space size="middle">
                        {typeof exhibit.commentCount === 'number' && (
                            <Typography.Text type="secondary">
                                Comments: {exhibit.commentCount}
                            </Typography.Text>
                        )}
                    {createdAt && (
                        <Typography.Text type="secondary">
                            {createdAt}
                        </Typography.Text>
                    )}
                    </Space>
                </Space>
                {onDelete && (
                    <Button danger onClick={() => onDelete(exhibit.id)}>
                        Delete
                    </Button>
                )}
                {showComments && <CommentStripe exhibitId={exhibit.id} />}
            </Space>
        </Card>
    );
};

export default Post;
