import { useEffect, useState } from 'react';
import { Alert, Empty, Space, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import { exhibitActions } from '@/api';
import { ControlBar, Pagination, Post } from '@/components';
import { ROUTE_PATHS } from '@/constants';
import type { Exhibit } from '@/types';

const PAGE_SIZE = 10;

const HomePage = () => {
    const navigate = useNavigate();
    const [exhibits, setExhibits] = useState<Exhibit[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const loadExhibits = async (pageToLoad = 1) => {
        setLoading(true);
        setError(null);
        try {
            const response = await exhibitActions.getMine(pageToLoad, PAGE_SIZE);
            console.log('HomePage posts response:', response);
            setExhibits(response.data);
            setTotal(response.total);
            setPage(response.page);
        } catch {
            setError('Failed to load your posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExhibits(1);
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await exhibitActions.remove(id);
            await loadExhibits(page);
        } catch {
            setError('Failed to delete post');
        }
    };

    return (
        <div style={{ padding: 24 }}>
            <ControlBar
                title="My posts"
                onRefresh={() => loadExhibits(page)}
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
            {!loading && !error && exhibits.length === 0 && (
                <Empty description="You have no posts yet" />
            )}
            <Space orientation="vertical" size="large" style={{ width: '100%' }}>
                {exhibits.map((exhibit) => (
                    <Post key={exhibit.id} exhibit={exhibit} onDelete={handleDelete} />
                ))}
            </Space>
            <Pagination
                current={page}
                total={total}
                pageSize={PAGE_SIZE}
                onChange={(nextPage) => loadExhibits(nextPage)}
            />
        </div>
    );
};

export default HomePage;
