import express, { Application } from 'express';

export default function runServer () {
    const app: Application = express();

    app.use(express.json()).use(express.urlencoded({ extended: true }));

    const route = require('./routes').default;
    route(app);

    return app;
}