import { useEffect, useState } from 'react';
import { Alert, Empty, Space, Spin } from 'antd';

import { exhibitActions } from '@/api';
import { ControlBar, Pagination, Post } from '@/components';
import { EVENTS, MESSAGES, PAGE_SIZE } from '@/constants';
import type { Exhibit } from '@/types';

const StripePage = () => {
    const [exhibits, setExhibits] = useState<Exhibit[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const loadExhibits = async (pageToLoad = 1) => {
        setLoading(true);
        setError(null);
        try {
            const response = await exhibitActions.getAll(pageToLoad, PAGE_SIZE);
            setExhibits(response.data);
            setTotal(response.total);
            setPage(response.page);
        } catch {
            setError(MESSAGES.loadPostsFailed);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExhibits(1);
    }, []);

    useEffect(() => {
        const handler = () => loadExhibits(1);
        window.addEventListener(EVENTS.POST_CREATED, handler);
        return () => {
            window.removeEventListener(EVENTS.POST_CREATED, handler);
        };
    }, []);

    return (
        <div style={{ padding: 24 }}>
            <ControlBar title="All posts" onRefresh={() => loadExhibits(page)} />
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
                <Empty description="No posts yet" />
            )}
            <Space orientation="vertical" size="large" style={{ width: '100%' }}>
                {exhibits.map((exhibit) => (
                    <Post key={exhibit.id} exhibit={exhibit} />
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

export default StripePage;
