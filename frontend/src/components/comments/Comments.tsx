import type React from "react";
import "./comments.css";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

const Comments = (): React.ReactElement => {

    const [emojiPicker, setEmojiPicker] = useState<boolean>(false);

    const handleEmojiPicker = (): void => {
        setEmojiPicker((prev) => !prev);
    }
    return (
        <div className="comments">
            <div className="commentList">
                <span className="commentsCount">5 comments</span>

                <div className="comment">
                    <img src="/general/noAvatar.png" alt="" />
                    <div className="content">
                        <span className="username">John</span>
                        <p className="commentContent">
                            asdbask asdjkaskdjb askdjaskjdans asdkjasnbdkjasd asdkjnaskjdasd asdjkasndaksj
                        </p>
                        <span className="commentTime">1h</span>
                    </div>
                </div>

                <div className="comment">
                    <img src="/general/noAvatar.png" alt="" />
                    <div className="content">
                        <span className="username">John</span>
                        <p className="commentContent">
                            asdbask asdjkaskdjb askdjaskjdans asdkjasnbdkjasd asdkjnaskjdasd asdjkasndaksj
                        </p>
                        <span className="commentTime">1h</span>
                    </div>
                </div>

                <div className="comment">
                    <img src="/general/noAvatar.png" alt="" />
                    <div className="content">
                        <span className="username">John</span>
                        <p className="commentContent">
                            asdbask asdjkaskdjb askdjaskjdans asdkjasnbdkjasd asdkjnaskjdasd asdjkasndaksj
                        </p>
                        <span className="commentTime">1h</span>
                    </div>
                </div>

                <div className="comment">
                    <img src="/general/noAvatar.png" alt="" />
                    <div className="content">
                        <span className="username">John</span>
                        <p className="commentContent">
                            asdbask asdjkaskdjb askdjaskjdans asdkjasnbdkjasd asdkjnaskjdasd asdjkasndaksj
                        </p>
                        <span className="commentTime">1h</span>
                    </div>
                </div>

                <div className="comment">
                    <img src="/general/noAvatar.png" alt="" />
                    <div className="content">
                        <span className="username">John</span>
                        <p className="commentContent">
                            asdbask asdjkaskdjb askdjaskjdans asdkjasnbdkjasd asdkjnaskjdasd asdjkasndaksj
                        </p>
                        <span className="commentTime">1h</span>
                    </div>
                </div>

                <div className="comment">
                    <img src="/general/noAvatar.png" alt="" />
                    <div className="content">
                        <span className="username">John</span>
                        <p className="commentContent">
                            asdbask asdjkaskdjb askdjaskjdans asdkjasnbdkjasd asdkjnaskjdasd asdjkasndaksj
                        </p>
                        <span className="commentTime">1h</span>
                    </div>
                </div>

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