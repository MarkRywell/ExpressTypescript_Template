interface CommentInfo {
    _id: string;
    userId: string;
    content: string;
    username?: string;
    firstName?: string;
    lastName?: string;
}

interface PostInfo {
    _id: string;
    userId: string;
    title: string;
    content: string;
    comments: Array<CommentInfo>;
}