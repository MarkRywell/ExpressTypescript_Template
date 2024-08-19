import { Types } from 'mongoose';

export interface BasicModel {
    _id?: Types.ObjectId;
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
    followers?: Array<Types.ObjectId>;
    following?: Array<Types.ObjectId>;
}

export interface Address extends BasicModel {
    userId: Types.ObjectId;
    street: string;
    city: string;
    state?: string;
    zip: string;
    country?: string;
}

export interface Comment extends BasicModel{
    userId: Types.ObjectId;
    content: string;
}

export interface Post extends BasicModel {
    userId: Types.ObjectId;
    title: string;
    content: string;
    comments?: Array<Types.ObjectId>;
}