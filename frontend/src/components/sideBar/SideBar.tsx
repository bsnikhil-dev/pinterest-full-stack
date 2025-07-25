import type React from "react";
import "./SideBar.css";
import { Link } from "react-router";

const SideBar = (): React.ReactElement => {
    return (
        <div className="sidebar">
            <div className="menuIcons">
                <Link to="/" className="menuIcon">
                    <img src="/general/logo.png" alt="" className="logo"/>
                </Link>
                <Link to="/" className="menuIcon">
                    <img src="/general/home.svg" alt="" />
                </Link>
                <Link to="/create" className="menuIcon">
                    <img src="/general/create.svg" alt="" />
                </Link>
                <Link to="/" className="menuIcon">
                    <img src="/general/updates.svg" alt="" />
                </Link>
                <Link to="/" className="menuIcon">
                    <img src="/general/messages.svg" alt="" />
                </Link>
            </div>
            <Link to="/" className="menuIcon">
                <img src="/general/settings.svg" alt="" />
            </Link>
        </div>
    )
}

export default SideBar;