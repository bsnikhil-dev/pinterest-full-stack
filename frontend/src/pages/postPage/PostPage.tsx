import type React from "react";
import "./postPage.css";
import PostInteractions from "../../components/postInteractions/PostInteractions";
import { Link, useParams } from "react-router";
import Comments from "../../components/comments/Comments";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useEffect } from "react";
import { fetchPostData } from "../../features/post/postSlice";
import Spinner from "../../components/spinner/Spinner";
import AsyncLoaderComponent from "../../components/customAsyncComponent/AsyncLoader";
import ErrorComponent from "../../components/error/Error";
import { checkErrorStatus } from "../../utils/commonUtils";

const PostPage = (): React.ReactElement => {

    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { items: postData, status: loadingStatus, error } = useAppSelector((state) => state.post);

    let postImage: string | null = null;
    let userName: string | null = null;
    let userImage: string | null = null;
    let displayName: string | null = null;

    const isError = checkErrorStatus(error);

    if (postData[0]) {
        const { media, user } = postData[0];

        postImage = media as string;

        if (user) {
            userName = user.username as string;
            userImage = user.img as string;
            displayName = user.displayName as string;
        }
    }

    const handleRetry = () => {
        dispatch(fetchPostData(id as string));
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchPostData(id));
        }
    }, [id]);

    return (
        <AsyncLoaderComponent
            isLoading={loadingStatus}
            loaderComponent={<Spinner centered message="Loading Your Post!" />}
            isError={isError ? true : false}
            errorComponent={<ErrorComponent errorMessage={error.message as string} errorCode={error.code as number} onRetry={handleRetry} />}
            contentComponent={<div className="postpage">
                <Link to={`/`}>
                    <svg
                        height="20"
                        viewBox="0 0 24 24"
                        width="20"
                        style={{ cursor: "pointer" }}
                    >
                        <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
                    </svg>
                </Link>
                <div className="postContainer">
                    <div className="postImage">
                        <img src={postImage ? postImage : `/general/noAvatar.png`} width={736} />
                    </div>
                    <div className="postDetails">
                        <PostInteractions />
                        <Link to={`/user/${userName}`} className="postUser">
                            <img src={userImage ? userImage : `/general/noAvatar.png`} />
                            <span>{displayName}</span>
                        </Link>
                        <Comments userId={id} />
                    </div>
                </div>
            </div>}
        />

    )
}

export default PostPage;