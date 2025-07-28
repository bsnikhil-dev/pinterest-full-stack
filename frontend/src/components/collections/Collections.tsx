import type React from "react";
import "./collections.css";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useEffect } from "react";
import { fetchCollections } from "../../features/collections/collectionsSlice";
import { Link } from "react-router";

const Collections = ({ userId }: { userId: string }): React.ReactElement => {

    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector((state) => state.collections);

    function timeAgo(dateString: string): string {
        const now = new Date();
        const past = new Date(dateString);
        const diffMs = now.getTime() - past.getTime();

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

        if (seconds < 60) return rtf.format(-seconds, 'second');
        if (minutes < 60) return rtf.format(-minutes, 'minute');
        if (hours < 24) return rtf.format(-hours, 'hour');
        return rtf.format(-days, 'day');
    }

    console.log(timeAgo("2025-07-26T02:52:11.733Z")); // e.g. "40 minutes ago"


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