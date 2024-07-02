import mongoose from 'mongoose';
import config from '@config';
import logger from '@logger';

mongoose.set('strictQuery', false);

const DBConnection = async (callBack: any) => {
    try {
        const ConnectionAccount = `${config.MONGODB.MONGODB_USERNAME}:${config.MONGODB.MONGODB_PASSWORD}`
        const connectionString = `mongodb+srv://${ConnectionAccount}@${config.MONGODB.MONGODB_IP}/${config.MONGODB.MONGODB_APP}?authSource=admin`

        const client = await mongoose.connect(connectionString, {
            autoCreate: true
        });

        if(client) {
            logger.info('\x1b[34m', 'MongoDB Connection Successful!')
            return callBack()
        } else {
            return callBack(client)
          }
    } catch (error) {
        callBack(error)
    }
}

export default DBConnection;
