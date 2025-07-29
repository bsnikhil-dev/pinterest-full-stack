export interface User {
    _id: string;
    displayName: string;
    username: string;
    img: string;
}

export interface UserComment {
    _id: string;
    description: string;
    pin: string;
    user: User;
    createdAt: string;
    updatedAt: string;
    __v: number;
};