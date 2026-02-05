import { io, type Socket } from 'socket.io-client';

import { SOCKET_SERVER_URL } from '@/constants';
import type { NotificationPayload } from '@/types';

let socket: Socket | null = null;

const getSocket = () => {
    if (!socket) {
        socket = io(SOCKET_SERVER_URL, {
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true,
            reconnectionDelay: 1000,
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
