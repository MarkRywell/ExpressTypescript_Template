import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import config from '@config';


const serviceAccountAuth = new JWT({
    email: config.GOOGLE.GOOGLE_EMAIL,
    key: (config.GOOGLE.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export default (sheetId: string) => {
    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);

    return doc;
}



