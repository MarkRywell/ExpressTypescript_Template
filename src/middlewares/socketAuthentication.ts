import { verifyJWTToken} from '@utils/auth.utils';
import { Socket } from 'socket.io';

export default (socket: Socket | any, next: any) => {
    try {
        if (!socket.handshake.query.token) {
            socket.disconnect();
            throw new Error('Unauthorized');
        }

        const token: any = verifyJWTToken(String(socket.handshake.query.token));

        socket.user = token.userConfig;

        next();
    } catch (err) {
        socket.disconnect();
        next(new Error('Unauthorized'));
    }
};
