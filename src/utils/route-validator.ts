import userModel from '@models/user.model';
import { CustomValidator } from 'express-validator';

/**
 * @description Check if username already exists
 * @param username 
 * @returns Error if username already exists
 * @throws Username already exists
 */
const checkUsername: CustomValidator = async (username: string) => {
    const user = await userModel.findUserByUsername(username);
    if(user) throw new Error ('Username already exists');
    return true;
}


export {
    checkUsername,
}