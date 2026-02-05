import { notification } from 'antd';

import type { NotificationPayload } from '@/types';

const notifyInfo = (payload: NotificationPayload) => {
    const message = payload.title ?? 'Notification';
    const description = payload.message ?? payload.text ?? '';

    notification.info({
        message,
        description,
        placement: 'topRight',
    });
};

export { notifyInfo };
