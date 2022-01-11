import "./orgmainchat.css";
import MessageBar from "../MessageBar";
import Message from "../Message";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/session";
import { offAction } from "../store/showForm";

function Orgmainchat() {
  const dispatch = useDispatch();
  const hist = useNavigate();
  const session = useSelector((state) => state.session.user);
  const showForm = useSelector((state) => state.showFormReducer);
  const [userData, setUserData] = useState({});
  const [channelName, setChannelName] = useState("");
  const profDiv = useRef(null);
  async function getUserData(id) {
    const res = await fetch(`/api/users/${session.id}`);
    if (res.ok) {
      const user = await res.json();
      setUserData(user);
    }
    return null;
  }
  useEffect(() => {
    if (session) getUserData(session.id);
  }, [session]);
  function profClick(e) {
    e.stopPropagation();
    profDiv.current.classList.toggle("settings");
  }
  function awayClick(e) {
    let flag = false;
    profDiv.current.classList.forEach((e) => {
      if (e === "settings") flag = true;
    });
    if (!flag) profDiv.current.classList.toggle("settings");
  }
  return (
    <div className="content">
      {showForm && (
        <div
          className="blackout"
          onClick={(e) => {
            dispatch(offAction());
          }}
        ></div>
      )}
      {showForm && (
        <form
          className="channelForm"
          onSubmit={(e) => {
            e.preventDefault();
            if(channelName) dispatch(offAction());
            setChannelName("");
          }}
        >
          <div className="form1">
            <h2>Create Text Channel</h2>
            <label>Channel Name</label>
            <input
              placeholder={"# new channel"}
              value={channelName}
              onChange={(e) => {
                setChannelName(e.target.value);
              }}
              required
            ></input>
          </div>
          <div id="channelButton">
            <p
              className="cancel"
              onClick={(e) => {
                dispatch(offAction());
                setChannelName("");
              }}
            >
              Cancel
            </p>
            <button className="submit" disabled={!channelName}>
              Submit
            </button>
          </div>
        </form>
      )}
      <div className="topBar" onClick={awayClick}>
        <div></div>
        <input placeholder={"Search"}></input>
        <div className="profile">
          {userData?.profilePicture ? (
            <img
              src={userData.profilePicture}
              alt="404"
              onClick={profClick}
            ></img>
          ) : (
            <img
              src="https://avatars.slack-edge.com/2015-03-13/4045125376_172ec0a9d33356de3571_88.jpg"
              alt="404"
              onClick={profClick}
            ></img>
          )}
          <div
            className="profMenu settings"
            ref={profDiv}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              onClick={async () => {
                await dispatch(logout());
                hist("/");
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      <div className="midContent1" onClick={awayClick}>
        <MessageBar />
        <Message user={userData} />
      </div>
    </div>
  );
}

export default Orgmainchat;
