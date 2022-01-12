import { useState } from "react";
import { onAction } from "../store/showForm";
import { useDispatch } from "react-redux";
import "./search.css";

function Search() {
    const dispatch = useDispatch();

    return (
        <form action="/" method="get">
            <input
                className="searchbar"
                type="text"
                id="header-search"
                placeholder="Search blog posts"
                name="s"
            />
        </form>
    );
}

export default Search;
