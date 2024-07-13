import { Request, Response } from 'express';
import userModel from '@models/user.model';
import addressModel from '../models/address.model';
import loadSheet from '@lib/google-spreadsheet';

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
    },

    addToSheets: async (req: Request, res: Response) => {
        const { sheetId, headers } = req.body;

        // Create the row data object dynamically based on the headers
        const rowData: {[key:string]: any} = {};
        headers.forEach((header: string) => {
            // Convert the header to a valid key for the request body
            const key = header.toLowerCase().replace(/[^\w]/g, '');
            if (req.body[key] !== undefined) {
                rowData[header] = req.body[key];
            }
        });

        // Add to google sheets
        const doc = loadSheet(sheetId);

        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        sheet.setHeaderRow(headers);

        await sheet.addRow(rowData);

        return res.json({ message: 'Added to google sheets' });
       
    }

}