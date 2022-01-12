import "./singlemember.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function SingleMember({ username }) {

    return (
        <>
            <div className="membername">{username}</div>
            <h1>hiii</h1>
        </>
    );
}

export default SingleMember;
