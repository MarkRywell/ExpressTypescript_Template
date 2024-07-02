import { User } from "../typescript/interfaces/schema.types";

const convertToBasicInfo = (user: any): UserBasicInfo => {
    return {
        _id: String(user._id),
        username: user.username,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
    }
}

export {
    convertToBasicInfo
}