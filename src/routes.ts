import { Application } from 'express';
import cors from 'cors';
import userRouter from '@routes/user.route';
import authRouter from '@routes/auth.route';
import checkAuthentication from '@middlewares/checkAuthentication';

export default function routes(app: Application) {
    app.use(cors());
    app.get('/', (req, res) => {
        return res.send({
            status: 'online',
            id: 'api',
            pid: process.pid
        });
    });

    app.use(checkAuthentication)
    
    app.use('/user', userRouter);
    app.use('/auth', authRouter);
}