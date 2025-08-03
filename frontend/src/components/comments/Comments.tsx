import React, { Suspense } from "react";
import "./comments.css";
import { type EmojiClickData } from "emoji-picker-react";
import { useCallback, useEffect, useState, } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchUserCommentsData, addComments } from "../../features/user/useSlice";
import { timeAgo } from "../../utils/commonUtils";

const EmojiPicker = React.lazy(() => import('emoji-picker-react'));

const Comments = ({ userId }: { userId?: string }): React.ReactElement => {

    const [emojiPicker, setEmojiPicker] = useState<boolean>(false);
    const [commentInput, setCommentInput] = useState<string>("");

    const handleEmojiPicker = useCallback((): void => {
        setEmojiPicker((prev) => !prev);
    }, [])

    const dispatch = useAppDispatch();
    const comments = useAppSelector((state) => state.user.comments);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentInput(e.target.value);
    }

    const handleEmojiInput = (emojiData: EmojiClickData) => {
        setCommentInput((prev) => prev + emojiData.emoji)
        setEmojiPicker((prev) => !prev);
    }

    const handleCommentFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addComments({ description: commentInput, pin: userId as string }));
        
    }

    useEffect(() => {
        dispatch(fetchUserCommentsData(userId as string));
    }, [userId])


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