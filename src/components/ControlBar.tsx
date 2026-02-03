import { Button, Space, Typography } from 'antd';

type ControlBarProps = {
    title: string;
    onRefresh?: () => void;
    onCreate?: () => void;
    createLabel?: string;
};

const ControlBar = ({ title, onRefresh, onCreate, createLabel = 'New Post' }: ControlBarProps) => {
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                marginBottom: 16,
            }}
        >
            <Typography.Title level={2} style={{ margin: 0 }}>
                {title}
            </Typography.Title>
            <Space>
                {onRefresh && (
                    <Button onClick={onRefresh}>
                        Refresh
                    </Button>
                )}
                {onCreate && (
                    <Button type="primary" onClick={onCreate}>
                        {createLabel}
                    </Button>
                )}
            </Space>
        </div>
    );
};

export default ControlBar;
