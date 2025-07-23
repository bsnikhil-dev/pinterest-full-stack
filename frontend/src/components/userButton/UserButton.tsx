import type React from "react";
import "./UserButton.css";
import { useState } from "react";

const UserButton = (): React.ReactElement => {

    const [showOptions, setShowOptions] = useState<boolean>(false);
    const flag = true;

    const handleOptionsClick = (): void => {
        setShowOptions((prev) => !prev);
    }

    return flag ? (
        <div className="userbutton">
            <img src="/general/noAvatar.png" alt="" />
            <img src="/general/arrow.svg" alt="" className="arrow" onClick={handleOptionsClick} />
            {
                showOptions &&
                <div className="useroptions">
                    <div className="useroption">Profile</div>
                    <div className="useroption">Settings</div>
                    <div className="useroption">Logout</div>
                </div>
            }

        </div>
    ) : (<a href="/" className="loginlink">Login / Sign Up</a>)
}

export default UserButton;