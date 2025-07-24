import type React from "react";
import "./profilePage.css";
import { useState } from "react";
import Gallery from "../../components/gallery/Gallery";
import Collections from "../../components/collections/Collections";

const ProfilePage = (): React.ReactElement => {

    const [active, setActive] = useState<string>("saved");

    return (
        <div className="profilePage">
            <img className="profileImage"
                width={100}
                height={100}
                src="/general/noAvatar.png" alt="" />
            <h1 className="profileName">John Doe</h1>
            <span className="profileUsername">john@doe</span>
            <div className="followers">10 Followers - 20 Following</div>
            <div className="profileInteractions">
                <img src="/general/share.svg" />
                <div className="profileButtons">
                    <button>Message</button>
                    <button>Follow</button>
                </div>
                <img src="/general/more.svg" />
            </div>
            <div className="profileOptions">
                <span onClick={()=>{setActive("created")}} className={active==="created" ? "active":"" }>Created</span>
                <span onClick={()=>{setActive("saved")}} className={active==="saved" ? "active":"" }>Saved</span>
            </div>
            {
                active === "created" ? <Gallery /> : <Collections />
            }
        </div>
    )
}

export default ProfilePage;