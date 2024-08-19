import { InferSchemaType, Schema, model } from "mongoose";
import { Post as PostType } from "@interfaces/schema.types";

const PostSchema = new Schema<PostType>({
    userId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
});

type Post = InferSchemaType<typeof PostSchema>;

export default model<Post>('Post', PostSchema);