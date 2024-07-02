import { Server } from "socket.io";
import socketRoute from "@routes/socket.route";
import socketAuthentication from "@middlewares/socketAuthentication";

const socketConnection = (httpServer: any) => {
    const io = new Server(httpServer);

    io.use(socketAuthentication)
    io.on('connection', socketRoute);

    global.io = io;
}

export default socketConnection;