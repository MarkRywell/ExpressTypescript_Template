import socketController from '@controllers/socket.controller';

export default (socket: any) => {

    // User will join a room
    socket.on('join-room', (room: string) => {
        socketController.joinRoom(socket, room);
    });
}