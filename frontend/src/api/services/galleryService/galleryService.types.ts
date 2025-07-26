export interface GalleryItem {
    _id: string;
    media?: string;
    width?: number;
    height?: number;
    title?: string;
    description?: string;
    link?: string;
    board?: string;
    tags?: string[];
    user?: User;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface User {
    _id: string;
    displayName: string;
    username: string;
    img: string;
}

export type GalleryResponse = GalleryItem[];


