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
    user?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export type GalleryResponse = GalleryItem[];


