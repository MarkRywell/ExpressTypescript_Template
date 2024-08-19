import { InferSchemaType, Schema, model } from "mongoose";
import { Comment as CommentType } from "@interfaces/schema.types";

const CommentSchema = new Schema<CommentType>({
    userId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true }
});

type Comment = InferSchemaType<typeof CommentSchema>;

export default model<Comment>('Comment', CommentSchema);