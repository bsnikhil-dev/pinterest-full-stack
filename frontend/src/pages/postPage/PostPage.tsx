import type React from "react";
import "./postPage.css";
import PostInteractions from "../../components/postInteractions/PostInteractions";
import { Link, useParams } from "react-router";
import Comments from "../../components/comments/Comments";
import { useEffect, useState } from "react";
import Spinner from "../../components/spinner/Spinner";
import AsyncLoaderComponent from "../../components/customAsyncComponent/AsyncLoader";
import ErrorComponent from "../../components/error/Error";
import { useQuery } from "@tanstack/react-query";
// import type { GalleryResponse } from "../../api/services/galleryService/galleryService.types";
import { fetchPost } from "../../api/services/galleryService";
import axios from "axios";

const PostPage = (): React.ReactElement => {

    const { id } = useParams();

    const [errorState, setErrorState] = useState<{ code: number | null; message: string | null }>({ code: null, message: null });

    const { isFetching: postloadingStatus,
        data: postData,
        error: postError, isError: postErrorFlag, refetch } = useQuery<any, any>({

            queryKey: ["post"],
            queryFn: () => fetchPost(id as string),
            refetchOnWindowFocus: false,
            retry: false,
        });

    const { media, user } = postData;

    let postImage = media as string;
    let userName = user.username as string;
    let userImage = user.img as string;
    let displayName = user.displayName as string;

    useEffect(() => {
        if (postError) {
            if (axios.isAxiosError(postError)) {
                setErrorState({ code: postError?.status as number, message: postError?.response?.data.message })
                return;
            }
            setErrorState({ code: postError?.response?.status as number, message: postError?.response?.data.message });
            return;
        }
    }, [postErrorFlag, postError])

    return (
        <AsyncLoaderComponent
            isLoading={postloadingStatus}
            loaderComponent={<Spinner centered message="Loading Your Post!" />}
            isError={postErrorFlag ? true : false}
            errorComponent={<ErrorComponent errorMessage={errorState.message as string} errorCode={errorState.code as number} onRetry={refetch} />}
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