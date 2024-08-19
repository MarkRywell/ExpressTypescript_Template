import Post from '@schemas/post.schema';
import { Types } from 'mongoose';

export default {
    createPost: async (payload: PostPayload) => {
        return await Post.create({ ...payload });
    },

    findPostById: async (id: string) => {
        const result = await Post.aggregate([
            { $match: { _id: new Types.ObjectId(id) } },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'comments'
                }
            },
            { $unwind: '$comments' },
            {
                $lookup: {
                    from: 'users',
                    localField: 'comments.userId',
                    foreignField: '_id',
                    as: 'comments.user'
                }
            },
            { $unwind: '$comments.user' },
            { $project: {
                _id: 1,
                title: 1,
                content: 1,
                'comments._id': 1,
                'comments.content': 1,
                'comments.user._id': 1,
                'comments.user.username': 1,
                'comments.user.firstName': 1,
                'comments.user.lastName': 1
            }}
        ]);

        return result[0];
    },

    findPostsByUserIds: async (userIds: Array<string>) => {
        return await Post.find({ userId: { $in: userIds } }).populate({path: 'userId', select: 'username firstName lastName'});
    },

}