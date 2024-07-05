import User from "@schemas/user.schema";
import Address from "@schemas/address.schema";

export default {
    createUser: async (payload: UserPayload) => {
        return await User.create({ ...payload })
    },

    findUserById: (id: string) => {
        return User.findByPk(id);
    },

    findUserByUsername: (username: string) => {
        return User.findOne({ where: { username } });
    },

    validateRefreshToken: async (userId: string, refreshToken: string) => {
        return await User.findOne({ where: {_id: userId, refreshToken} });
    },

    getUserInfo: async (userId: string) => {
        return await User.findOne({
            where: { _id: userId },
            include: [{
                model: Address,
                as: 'address',
                attributes: ['street', 'city', 'state', 'zip', 'country']
            }],
            attributes: ['_id', 'username', 'firstName', 'lastName'],
        })
    }
}

