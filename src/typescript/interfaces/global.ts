export interface MYSQL {
    MYSQL_DATABASE: string;
    MYSQL_USERNAME: string;
    MYSQL_PASSWORD: string;
}

export interface CONFIG {
    HOST: string;
    PORT: number;
    ENV: string;
    ACCESS_KEY: string;
    REFRESH_KEY: string;
    MYSQL: MYSQL
}