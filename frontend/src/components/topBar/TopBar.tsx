import type React from "react";
import "./TopBar.css";
import UserButton from "../userButton/UserButton";
import { useRef, type FormEvent } from "react";
import { useNavigate } from "react-router";

const TopBar = (): React.ReactElement => {

    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>): void => {

        let searchQuery = inputRef.current?.value.trim();

        event.preventDefault();
        if (!searchQuery) return;
        navigate(`/search?query=${searchQuery}`);
    }

    return (
        <div className="topbar">
            <form onSubmit={handleSearchSubmit} className="searchbar">
                <img src="/general/search.svg" alt="" />
                <input type="text" placeholder="Search" ref={inputRef} />
            </form>
            <UserButton />
        </div>
    )
}

export default TopBar;