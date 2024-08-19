import Comment from '@schemas/comment.schema';

export default {
    createComment: async (payload: CommentPayload) => {
        return await Comment.create({ ...payload });
    }
}