import React, { Suspense } from "react";
import "./comments.css";
import { type EmojiClickData } from "emoji-picker-react";
import { useCallback, useState, } from "react";
import { timeAgo } from "../../utils/commonUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addUserComment, fetchUserComments } from "../../api/services/usersService";
import { AxiosError } from "axios";
import SmallSpinner from "../smallSpinner/SmallSpinner";

const EmojiPicker = React.lazy(() => import('emoji-picker-react'));

const Comments = ({ userId }: { userId?: string }): React.ReactElement => {

    const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
    const [commentInput, setCommentInput] = useState<string>("");

    const handleEmojiPicker = useCallback((): void => {
        setEmojiPicker((prev) => !prev);
    }, [])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentInput(e.target.value);
    }

    const handleEmojiInput = (emojiData: EmojiClickData) => {
        setCommentInput((prev) => prev + emojiData.emoji)
        setEmojiPicker((prev) => !prev);
    }

    const handleCommentFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addComment({ comment: commentInput, pin: userId as string });
        setCommentInput("");
    }

    const queryClient = useQueryClient();

    const {
        data: comments,
        isFetching: getCommentLoading,
        isError: getCommentError,
        error: getCommentErrorDetails } = useQuery({
            queryKey: ['comments'],
            queryFn: () => fetchUserComments(userId as string),
            refetchOnWindowFocus: false,
        })

    const {
        mutate: addComment,
        isPending: addCommentLoading,
        isError: addCommentError,
        error: addCommentErrorDetails } = useMutation<string, Error, { comment: string; pin: string }>({
            mutationFn: ({ comment, pin }: { comment: string; pin: string }) => addUserComment(comment, pin),
            onSuccess(data) {
                queryClient.invalidateQueries({ queryKey: ['comments'] })
            },
            onError(error) {
                if (error instanceof AxiosError) {
                    console.error("Axios error :", error);
                }
                console.error("Other error:", error);
            },
        });

    console.log(getCommentError, getCommentErrorDetails)
    console.log(addCommentError, addCommentErrorDetails)
    if (getCommentLoading || addCommentLoading) {
        return <div><SmallSpinner message="Loading Comments" /></div>
    }

    return (
        <div className="comments">
            <div className="commentList">
                <span className="commentsCount">{comments?.length === 0 ? "No comments" : comments?.length + " Comments"}</span>
                {
                    comments?.map((comment) => {

                        return (<div className="comment" key={comment._id}>
                            <img src={comment.user.img || "/general/noAvatar.png"} alt="" />
                            <div className="content">
                                <span className="username">{comment.user.displayName}</span>
                                <p className="commentContent">
                                    {comment.description}
                                </p>
                                <span className="commentTime">{timeAgo(comment.createdAt)}</span>
                            </div>
                        </div>)
                    })
                }
            </div>

            <form className="commentForm" onSubmit={handleCommentFormSubmit}>
                <input type="text"
                    placeholder="Add a comment"
                    value={commentInput}
                    onChange={handleInput}
                />
                <div className="emoji">
                    <div onClick={handleEmojiPicker}>😊</div>
                    {
                        emojiPicker && <div className="emojiPicker">
                            <Suspense fallback={<div>Loading…</div>}>
                                <EmojiPicker onEmojiClick={handleEmojiInput} />
                            </Suspense>
                        </div>
                    }

                </div>
            </form>
        </div>
    )
}

export default Comments;