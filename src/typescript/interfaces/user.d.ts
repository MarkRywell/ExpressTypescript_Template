interface UserBasicInfo {
    _id: string;
    username: string;
    role: 'user' | 'admin';
    firstName: string;
    lastName: string;
}