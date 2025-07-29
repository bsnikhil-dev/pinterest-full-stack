import type React from "react";
import "./collections.css";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useEffect } from "react";
import { fetchCollections } from "../../features/collections/collectionsSlice";
import { Link } from "react-router";
import { timeAgo } from "../../utils/commonUtils";

const Collections = ({ userId }: { userId: string }): React.ReactElement => {

    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector((state) => state.collections);


    useEffect(() => {
        dispatch(fetchCollections(userId))
    }, [userId])

    console.log(items);
    return (
        <div className="collections">
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
        </div>
    )
}

export default Collections;