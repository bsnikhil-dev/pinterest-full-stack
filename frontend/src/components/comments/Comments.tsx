import type React from "react";
import "./comments.css";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchUserCommentsData } from "../../features/user/useSlice";
import { timeAgo } from "../../utils/commonUtils";

const Comments = ({ userId }: { userId?: string }): React.ReactElement => {

    const [emojiPicker, setEmojiPicker] = useState<boolean>(false);

    const handleEmojiPicker = (): void => {
        setEmojiPicker((prev) => !prev);
    }

    const dispatch = useAppDispatch();
    const comments = useAppSelector((state) => state.user.comments);

    useEffect(() => {
        dispatch(fetchUserCommentsData(userId as string));
    }, [userId])

    // console.log(comments);
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

            <form className="commentForm">
                <input type="text" placeholder="Add a comment" />
                <div className="emoji">
                    <div onClick={handleEmojiPicker}>😊</div>
                    {
                        emojiPicker && <div className="emojiPicker">
                            <EmojiPicker />
                        </div>
                    }

                </div>
            </form>
        </div>
    )
}

export default Comments;