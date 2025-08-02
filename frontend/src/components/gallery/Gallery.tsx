import type React from "react";
import "./Gallery.css";
import GalleryItem from "../galleryItem/GalleryItem";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useEffect } from "react";
import { fetchGallery } from "../../features/gallery/gallerySlice";
import Spinner from "../spinner/Spinner";
import AsyncLoaderComponent from "../customAsyncComponent/AsyncLoader";
import ErrorComponent from "../error/Error";
import { checkErrorStatus } from "../../utils/commonUtils";

interface GalleryProps {
    searchQuery?: string;
    userId?: string;
    collectionId?: string
}
const Gallery = (payload: GalleryProps): React.ReactElement => {

    const dispatch = useAppDispatch();
    const { items: galleryItems, status: loadingStatus, error } = useAppSelector((state) => state.gallery);

    const isError = checkErrorStatus(error);

    const handleRetry = () => {
        dispatch(fetchGallery(payload));
    }
    
    useEffect(() => {
        dispatch(fetchGallery(payload));
    }, [payload])

    return (

        <AsyncLoaderComponent
            isLoading={loadingStatus}
            loaderComponent={<Spinner centered message="Loading All Your Post's... Please wait!" />}
            isError={isError ? true : false}
            errorComponent={<ErrorComponent errorMessage={error.message as string} errorCode={error.code as number} onRetry={handleRetry} />}
            contentComponent={<div className="gallery">
                {galleryItems?.map((item) => {
                    const galleryItem = { id: item._id, media: item.media || '', width: item.width || 0, height: item.height || 0 };
                    return <GalleryItem item={galleryItem} key={item._id} />
                })
                }
            </div>}
        />

    )
}

export default Gallery;