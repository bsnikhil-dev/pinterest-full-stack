import type React from "react";
import "./Gallery.css";
import GalleryItem from "../galleryItem/GalleryItem";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import AsyncLoaderComponent from "../customAsyncComponent/AsyncLoader";
import ErrorComponent from "../error/Error";
import { useQuery } from "@tanstack/react-query";
import { fetchGalleryItems } from "../../api/services/galleryService";
import axios from "axios";
import type { GalleryResponse } from "../../api/services/galleryService/galleryService.types";

interface GalleryProps {
    searchQuery?: string;
    userId?: string;
    collectionId?: string
}
const Gallery = (payload: GalleryProps): React.ReactElement => {

    const [errorState, setErrorState] = useState<{ code: number | null; message: string | null }>({ code: null, message: null });

    const { isFetching: loadingStatus,
        data: galleryItems,
        error: galleryError, isError: galleryErrorFlag, refetch } = useQuery<GalleryResponse, any>({

            queryKey: ["gallery"],
            queryFn: () => fetchGalleryItems(payload),
            refetchOnWindowFocus: false,
            retry: false,
        });

    useEffect(() => {
        if (galleryError) {
            if (axios.isAxiosError(galleryError)) {
                setErrorState({ code: galleryError?.status as number, message: galleryError?.response?.data.message })
                return;
            }
            setErrorState({ code: galleryError?.response?.status as number, message: galleryError?.response?.data.message });
            return;
        }
    }, [galleryErrorFlag, galleryError])


    return (

        <AsyncLoaderComponent
            isLoading={loadingStatus}
            loaderComponent={<Spinner centered message="Loading All Your Post's... Please wait!" />}
            isError={galleryErrorFlag ? true : false}
            errorComponent={<ErrorComponent errorCode={errorState.code as number} errorMessage={errorState.message as string} onRetry={refetch} />}
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