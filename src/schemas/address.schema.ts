import { InferSchemaType, Schema, model } from "mongoose";
import { Address as AddressType } from "@interfaces/schema.types";

const { ObjectId } = Schema.Types;

const AddressSchema = new Schema<AddressType>({
    userId: { type: ObjectId, required: true, ref: 'User' },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    zip: { type: String, required: true },
    country: { type: String },
})

type Address = InferSchemaType<typeof AddressSchema>;

export default model<Address>('Address', AddressSchema);