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

interface PostPayload {
    userId: string;
    title: string;
    content: string;
}

interface CommentPayload {
    userId: string;
    content: string;
}