import User from "@schemas/user.schema";

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
    }
}

