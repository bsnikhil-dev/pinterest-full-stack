import type React from "react";
import "./TopBar.css";
import UserButton from "../userButton/UserButton";

const TopBar = ():React.ReactElement=>{
    return(
        <div className="topbar">
            <div className="searchbar">
                <img src="/general/search.svg" alt="" />
                <input type="text" placeholder="Search"/>
            </div>
            <UserButton />
        </div>
    )
}

export default TopBar;