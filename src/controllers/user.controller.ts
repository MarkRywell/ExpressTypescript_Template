import { Request, Response } from 'express';
import userModel from '@models/user.model';
import addressModel from '../models/address.model';

export default {
    getUserInfo: async (req: Request, res: Response) => {
        const { userId } = req.query;

        const user = await userModel.getUserInfo(String(userId));
        
        return { user }
    },

    addAddressToUser: async (req: Request, res: Response) => {
        const { userId }: any = req.query;
        const { street, city, state, zip, country } = req.body;

        const addressPayload: AddressPayload = {
            userId,
            street,
            city,
            state,
            zip,
            country
        };

        await addressModel.createAddress(addressPayload);

        return { message: 'Address added successfully' };
    }

}