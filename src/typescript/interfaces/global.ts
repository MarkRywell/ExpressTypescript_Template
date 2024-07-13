export interface MONGODB {
    MONGODB_USERNAME: string;
    MONGODB_PASSWORD: string;
    MONGODB_APP: string;
    MONGODB_URI: string;
    MONGODB_IP: string;
}

export interface GOOGLE {
    GOOGLE_EMAIL: string;
    GOOGLE_PRIVATE_KEY: string;
}

export interface CONFIG {
    HOST: string;
    PORT: number;
    ENV: string;
    ACCESS_KEY: string;
    REFRESH_KEY: string;
    MONGODB: MONGODB;
    GOOGLE: GOOGLE;
}