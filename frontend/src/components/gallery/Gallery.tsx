import type React from "react";
import "./Gallery.css";
import GalleryItem from "../galleryItem/GalleryItem";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useEffect } from "react";
import { fetchGallery } from "../../features/gallery/gallerySlice";


const Gallery = (): React.ReactElement => {

    const dispatch = useAppDispatch();
    const { status, items: galleryItems } = useAppSelector((state) => state.gallery);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchGallery());
        }
    }, [dispatch, status])

 
    return (
        <div className="gallery">
            {galleryItems?.map((item) => {
                const galleryItem = { id: item._id, media: item.media || '', width: item.width || 0, height: item.height || 0 };
                return <GalleryItem item={galleryItem} key={item._id} />
            })
            }
        </div>
    )
}

export default Gallery;