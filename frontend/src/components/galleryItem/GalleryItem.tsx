import type React from "react";
import "./GalleryItem.css";
import type { GalleryItemProps } from "./galleryTypes";
import { Link } from "react-router";

const GalleryItem = ({ item: { id, media, width, height } }: { item: GalleryItemProps }): React.ReactElement => {

    return (
        <div className="galleryitem"
            style={{ gridRowEnd: `span ${Math.ceil(height / 100)}` }}>
            <img src={media} alt="" />
            <Link to={`/pin/${id}`} className="overlay" />
            <button className="saveButton">Save</button>
            <div className="overlayIcons">
                <button>
                    <img src={media} alt="" />
                </button>
                <button>
                    <img src={media} alt="" />
                </button>
            </div>
        </div>
    )
}

export default GalleryItem;