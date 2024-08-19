import { InferSchemaType, Schema, model } from "mongoose";
import { User as UserType } from "@interfaces/schema.types";

const UserSchema = new Schema<UserType>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    refreshToken: { type: String },
    followers: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'users' }]
})

type User = InferSchemaType<typeof UserSchema>;

export default model<User>('User', UserSchema);