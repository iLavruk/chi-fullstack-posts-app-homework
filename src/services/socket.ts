import { io, type Socket } from 'socket.io-client';

import { SOCKET_SERVER_URL, SOCKET_RECONNECT_DELAY_MS } from '@/constants';
import type { NotificationPayload } from '@/types';

let socket: Socket | null = null;

const getSocket = () => {
    if (!socket) {
        socket = io(SOCKET_SERVER_URL, {
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true,
            reconnectionDelay: SOCKET_RECONNECT_DELAY_MS,
        });
    }

    return socket;
};

const disconnectSocket = () => {
    if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
        socket = null;
    }
};

export type { NotificationPayload };
export { getSocket, disconnectSocket };
