import { Button, Card, Space, Tag, Typography } from 'antd';

import type { Exhibit } from '@/types';
import { API_URL } from '@/constants';
import CommentStripe from './CommentStripe';

type PostProps = {
    exhibit: Exhibit;
    onDelete?: (id: number) => void;
    showComments?: boolean;
};

const Post = ({ exhibit, onDelete, showComments = true }: PostProps) => {
    const createdAt = exhibit.createdAt ? new Date(exhibit.createdAt).toLocaleString() : '-';
    const title = exhibit.title ?? exhibit.description ?? `Exhibit #${exhibit.id}`;
    const description =
        exhibit.title && exhibit.description ? exhibit.description : undefined;

    const resolveUrl = (value: string) => {
        if (value.startsWith('http')) {
            return value;
        }
        if (value.startsWith('/')) {
            return `${API_URL}${value}`;
        }
        return `${API_URL}/${value}`;
    };

    const imageSrc = exhibit.imageUrl
        ? resolveUrl(exhibit.imageUrl)
        : exhibit.image
            ? exhibit.image.startsWith('http')
                ? exhibit.image
                : resolveUrl(`/api/exhibits/static/${exhibit.image}`)
            : undefined;

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
                    {exhibit.authorId !== undefined ? (
                        <Typography.Text type="secondary">
                            Author ID: {exhibit.authorId}
                        </Typography.Text>
                    ) : (
                        <span />
                    )}
                    {exhibit.createdAt && (
                        <Typography.Text type="secondary">
                            {createdAt}
                        </Typography.Text>
                    )}
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
