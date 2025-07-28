import type React from "react";
import "./profilePage.css";
import { useEffect, useState } from "react";
import Gallery from "../../components/gallery/Gallery";
import Collections from "../../components/collections/Collections";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchUserData } from "../../features/user/useSlice";
import Spinner from "../../components/spinner/Spinner";

const ProfilePage = (): React.ReactElement => {

    const [active, setActive] = useState<string>("saved");
    const { username } = useParams();
    const dispatch = useAppDispatch();
    const { user, status, error } = useAppSelector((state) => state.user);

    const { _id, displayName, email, followerCount, followingCount, img: userImage } = user || {};

    useEffect(() => {
        dispatch(fetchUserData(username as string))
    }, [username])

    return (
        <div className="profilePage">
            {status === "loading" && <Spinner message="Loading Your Data. Please Wait.." />}
            {status === "succeeded" &&
                <>
                    <img className="profileImage"
                        width={100}
                        height={100}
                        src={userImage || "/general/noAvatar.png"} alt="" />
                    <h1 className="profileName">{displayName}</h1>
                    <span className="profileUsername">{email}</span>
                    <div className="followers">{followerCount} Followers - {followingCount} Following</div>
                    <div className="profileInteractions">
                        <img src="/general/share.svg" />
                        <div className="profileButtons">
                            <button>Message</button>
                            <button>Follow</button>
                        </div>
                        <img src="/general/more.svg" />
                    </div>
                    <div className="profileOptions">
                        <span onClick={() => { setActive("created") }} className={active === "created" ? "active" : ""}>Created</span>
                        <span onClick={() => { setActive("saved") }} className={active === "saved" ? "active" : ""}>Saved</span>
                    </div>
                    {
                        active === "created" ? <Gallery userId={_id} /> : <Collections userId={_id as string} />
                    }
                </>
            }

        </div>
    )
}

export default ProfilePage;