interface UserPayload {
    username: string;
    password: string;
    role: 'user' | 'admin';
    firstName: string;
    lastName: string;
}

interface AddressPayload {
    userId: string;
    street: string;
    city: string;
    state?: string;
    zip: string;
    country?: string;
}