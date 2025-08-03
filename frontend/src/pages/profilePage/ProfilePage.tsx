import type React from "react";
import "./profilePage.css";
import { useEffect, useState } from "react";
import Gallery from "../../components/gallery/Gallery";
import Collections from "../../components/collections/Collections";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchUserData } from "../../features/user/useSlice";
import Spinner from "../../components/spinner/Spinner";
import AsyncLoaderComponent from "../../components/customAsyncComponent/AsyncLoader";
import { checkErrorStatus } from "../../utils/commonUtils";
import ErrorComponent from "../../components/error/Error";
import { followUser } from "../../api/services/usersService";

const ProfilePage = (): React.ReactElement => {

    const [active, setActive] = useState<string>("saved");
    const { username } = useParams();
    const dispatch = useAppDispatch();
    const { user, status: loadingStatus, error } = useAppSelector((state) => state.user);

    const { _id, displayName, email, followerCount, followingCount, img: userImage } = user || {};

    const isError = checkErrorStatus(error);
   
    const handleRetry = () => {
        dispatch(fetchUserData(username as string))
    };

    const handleFollow = async () => {
        try {
            const response = await followUser(username as string);

            console.log('Follow/unfollow successful:', response);
            // Optionally update UI state here (e.g., toggle follow button)
        } catch (error: any) {
            console.error('Error during follow/unfollow:', error.message || error);
            // Optionally show user feedback, e.g. toast
        }
    };


    useEffect(() => {
        dispatch(fetchUserData(username as string))
    }, [username])

    return (

        <AsyncLoaderComponent
            isLoading={loadingStatus}
            loaderComponent={<Spinner centered message="Loading Your Details! Please Wait." />}
            isError={isError ? true : false}
            errorComponent={<ErrorComponent errorMessage={error.message as string} errorCode={error.code as number} onRetry={handleRetry} />}
            contentComponent={<div className="profilePage">
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
                        <button onClick={handleFollow}> {followingCount ? "Unfollow" : "Follow"}</button>
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
            </div>}
        />

    )
}

export default ProfilePage;