import { notification } from 'antd';

import type { NotificationPayload } from '@/types';

const notifyInfo = (payload: NotificationPayload) => {
    const title = payload.title ?? 'Notification';
    const description = payload.message ?? payload.text;

    notification.info({
        title,
        description,
        placement: 'topRight',
    });
};

export { notifyInfo };
