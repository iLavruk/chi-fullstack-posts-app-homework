import { useEffect, useMemo, useState } from 'react';
import { Alert, Empty, Space, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import { exhibitActions } from '@/api';
import { ControlBar, Pagination, Post } from '@/components';
import { ROUTE_PATHS } from '@/constants';
import type { Exhibit } from '@/types';

const PAGE_SIZE = 5;

const HomePage = () => {
    const navigate = useNavigate();
    const [exhibits, setExhibits] = useState<Exhibit[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    const loadExhibits = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await exhibitActions.getMine();
            setExhibits(data);
            setPage(1);
        } catch {
            setError('Failed to load your posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExhibits();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await exhibitActions.remove(id);
            await loadExhibits();
        } catch {
            setError('Failed to delete post');
        }
    };

    const paged = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return exhibits.slice(start, start + PAGE_SIZE);
    }, [exhibits, page]);

    return (
        <div style={{ padding: 24 }}>
            <ControlBar
                title="My posts"
                onRefresh={loadExhibits}
                onCreate={() => navigate(ROUTE_PATHS.NEW_POST)}
            />
            {loading && <Spin />}
            {error && (
                <Alert
                    type="error"
                    message={error}
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}
            {!loading && !error && paged.length === 0 && (
                <Empty description="You have no posts yet" />
            )}
            <Space orientation="vertical" size="large" style={{ width: '100%' }}>
                {paged.map((exhibit) => (
                    <Post key={exhibit.id} exhibit={exhibit} onDelete={handleDelete} />
                ))}
            </Space>
            <Pagination
                current={page}
                total={exhibits.length}
                pageSize={PAGE_SIZE}
                onChange={(nextPage) => setPage(nextPage)}
            />
        </div>
    );
};

export default HomePage;
