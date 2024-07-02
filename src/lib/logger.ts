import bunyan from 'bunyan';
import config from '@config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pretty = require('@mechanicalhuman/bunyan-pretty');

const logger = bunyan.createLogger({
    name: 'Express_API',
    environment: config.ENV,
    stream: pretty(process.stdout, { timeStamps: false }),
});


export default {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: (message: string, component?: string, payload?: any) => {
        if (component) logger.info({ component, ...payload }, message);
        else logger.info(message);
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: (message: string, component?: string, error?: any) => {
        if (component) logger.error({ component, error }, message);
        else logger.error(message);
    },
};

