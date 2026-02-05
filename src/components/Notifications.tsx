import { useEffect } from 'react';
import { App as AntdApp } from 'antd';
import { useLocation } from 'react-router-dom';

import { EVENTS, NOTIFICATION_DURATION_MS, ROUTE_PATHS } from '@/constants';
import { getSocket } from '@/services';
import type { NotificationPayload } from '@/types';

const Notifications = () => {
    const { notification } = AntdApp.useApp();
    const location = useLocation();

    useEffect(() => {
        const socket = getSocket();

        const handleNewPost = (payload: NotificationPayload & { user: string; message: string }) => {
            const description = `${payload.user} added a new post with description: ${payload.message}`;

            notification.info({
                title: 'New post',
                description,
                duration: NOTIFICATION_DURATION_MS,
                placement: 'topRight',
            });

            if (location.pathname === ROUTE_PATHS.ROOT) {
                window.dispatchEvent(new CustomEvent(EVENTS.POST_CREATED));
            }
        };

        socket.on('newPost', handleNewPost);

        return () => {
            socket.off('newPost', handleNewPost);
        };
    }, [location.pathname, notification]);

    return null;
};

export default Notifications;
