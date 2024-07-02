import User from "@schemas/user.schema";
import { Types } from "mongoose";

export default {
    createUser: async (payload: UserPayload) => {
        return await User.create({ ...payload })
    },

    findUserById: (id: string) => {
        return User.findById(id).lean();
    },

    findUserByUsername: (username: string) => {
        return User.findOne({ username });
    },

    validateRefreshToken: async (userId: string, refreshToken: string) => {
        return await User.findOne({ _id: userId, refreshToken });
    },

    getUserInfo: async (userId: string) => {
        const result = await User.aggregate([
            { $match: { _id: new Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: 'addresses',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'address'
                }
            },
            { $unwind: '$address' },
            { $project: {
                _id: 1,
                username: 1,
                email: 1,
                firstName: 1,
                lastName: 1,
                'address.street': 1,
                'address.city': 1,
                'address.state': 1,
                'address.zip': 1,
                'address.country': 1
            }}
        ]);

        return result[0];
    }
}

