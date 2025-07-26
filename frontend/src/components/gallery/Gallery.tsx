import type React from "react";
import "./Gallery.css";
import GalleryItem from "../galleryItem/GalleryItem";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useEffect } from "react";
import { fetchGallery } from "../../features/gallery/gallerySlice";
import Spinner from "../spinner/Spinner";

interface GalleryProps {
    searchQuery?: string
}
const Gallery = ({ searchQuery }: GalleryProps): React.ReactElement => {

    const dispatch = useAppDispatch();
    const { items: galleryItems,status } = useAppSelector((state) => state.gallery);

    useEffect(() => {
        dispatch(fetchGallery(searchQuery));
    }, [searchQuery])

     if (status === "loading") {
        return (<Spinner centered message="Loading All Your Post's... Please wait!"    />)
    }

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