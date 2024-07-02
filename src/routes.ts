import { Application } from 'express';
import cors from 'cors';
import userRouter from '@routes/user.route';
import authRouter from '@routes/auth.route';
import checkAuthentication from '@middlewares/checkAuthentication';
import helmet from 'helmet';
import morgan from 'morgan';

export default function routes(app: Application) {
    app.use(cors());
    app.use(helmet());
    app.use(morgan('combined', {
        skip: (req, res) => {
            return req.ip === '::ffff:127.0.0.1'
        }
    }));

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