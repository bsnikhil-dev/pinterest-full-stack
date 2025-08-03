import type React from "react";
import "./collections.css";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useEffect } from "react";
import { fetchCollections } from "../../features/collections/collectionsSlice";
import { Link } from "react-router";
import { checkErrorStatus, timeAgo } from "../../utils/commonUtils";
import AsyncLoaderComponent from "../customAsyncComponent/AsyncLoader";
import Spinner from "../spinner/Spinner";
import ErrorComponent from "../error/Error";

const Collections = ({ userId }: { userId: string }): React.ReactElement => {

    const dispatch = useAppDispatch();
    const { items, status: loadingStatus, error } = useAppSelector((state) => state.collections);

    const isError = checkErrorStatus(error);

    const handleRetry = () => {
        dispatch(fetchCollections(userId))
    };

    useEffect(() => {
        if (!userId) return;
        dispatch(fetchCollections(userId))
    }, [userId])

    return (
        <AsyncLoaderComponent
            isLoading={loadingStatus}
            loaderComponent={<Spinner centered message="Loading Your Collections! Please Wait." />}
            isError={isError ? true : false}
            errorComponent={<ErrorComponent errorMessage={error.message as string} errorCode={error.code as number} onRetry={handleRetry} />}
            contentComponent={<div className="collections">
                {
                    items.map((item) => (<div className="collection" key={item._id}>
                        <Link to={`/search?collectionId=${item._id}`}>
                            <img src={item.firstPin.media} />
                            <div className="collectionsInfo">
                                <h1>{item.title}</h1>
                                <span>{item.pinCount} Pins - {timeAgo(item.createdAt)}</span>
                            </div>
                        </Link>
                    </div>))
                }
            </div>}
        />

    )
}

export default Collections;