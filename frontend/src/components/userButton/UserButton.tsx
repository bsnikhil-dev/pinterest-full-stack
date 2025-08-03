import type React from "react";
import "./UserButton.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hook";
import { logout } from "../../features/authentication/authentication";
import { logOutUser } from "../../api/services/usersService";

const UserButton = (): React.ReactElement => {

    const [showOptions, setShowOptions] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleOptionsClick = (): void => {
        setShowOptions((prev) => !prev);
    }

    const callLogOut = async () => {
        try {
            await logOutUser();
        } catch (err) {
            console.error("Logout API failed:", err);
        }
    }

    const handleLogout = (): void => {
        dispatch(logout());
        callLogOut();
        sessionStorage.removeItem("token");
        navigate("/auth", { replace: true });
    }


    return (
        <div className="userbutton">
            <img src="/general/noAvatar.png" alt="" />
            <img src="/general/arrow.svg" alt="" className="arrow" onClick={handleOptionsClick} />
            {
                showOptions &&
                <div className="useroptions">
                    <div className="useroption">Profile</div>
                    <div className="useroption">Settings</div>
                    <div className="useroption" onClick={handleLogout}>Logout</div>
                </div>
            }

        </div>
    )
}

export default UserButton;