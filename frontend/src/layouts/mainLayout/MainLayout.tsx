import type React from "react"
import SideBar from "../../components/sideBar/SideBar"
import TopBar from "../../components/topBar/TopBar"
import "./mainLayout.css";
import { Outlet } from "react-router";

const MainLayout = (): React.ReactElement => {
    return (
        <div className='app'>
            <SideBar />
            <div className="content">
                <TopBar />
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout