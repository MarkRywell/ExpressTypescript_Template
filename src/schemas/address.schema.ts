import { DataTypes } from "sequelize";
import sequelize from "@lib/database";
import { Address } from "@interfaces/schema.types";
import UserSchema from "./user.schema";

const AddressSchema = sequelize.define<Address>('addresses', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserSchema,
            key: '_id'
        }
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

UserSchema.hasOne(AddressSchema)
AddressSchema.belongsTo(UserSchema, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE'})

export default AddressSchema;