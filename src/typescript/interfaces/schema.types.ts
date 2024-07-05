import { Model } from 'sequelize';

export interface BasicModel extends Model {
    _id: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface User extends BasicModel {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'user' | 'admin';
    refreshToken: string;
}

export interface Address extends BasicModel {
    userId: string;
    street: string;
    city: string;
    state?: string;
    zip: string;
    country?: string;
}
