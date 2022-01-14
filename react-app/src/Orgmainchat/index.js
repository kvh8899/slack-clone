import "./orgmainchat.css";
import MessageBar from "../MessageBar";
import Message from "../Message";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/session";
import NewChannelForm from "../newChannelForm";
import EditChannelForm from "../EditChannelForm";
import EditOrgForm from "../EditOrgForm";
import Search from "../Search";

import { readChannels } from "../store/channels";
import { useParams } from "react-router-dom";
import { setName } from "../store/currentChannel";

function Orgmainchat() {
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedChannelId, setSelectedChannelId] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const hist = useNavigate();
  const session = useSelector((state) => state.session.user);
  const [userData, setUserData] = useState({});
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

  const backClick = (e) => {
    e.preventDefault();
    hist("/organization");
  };

  return (
    <div className="content">
      <NewChannelForm />
      <EditChannelForm />
      <EditOrgForm />
      <div className="topBar" onClick={awayClick}>
        <div className="backbuttoncontainer">
          <button className="backbutton" onClick={backClick}>
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>
        <div className="searchContainer">
          <Search />
        </div>
        <div className="profile">
          {userData?.profilePicture ? (
            <img
              className="unselect"
              src={userData.profilePicture}
              alt="404"
              onClick={profClick}
            ></img>
          ) : (
            <img
              className="unselect"
              src="https://cdn.discordapp.com/attachments/919391399269515305/930910536193933312/aa_logo.png"
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
        <div className="r">
          <MessageBar
            setSelectedChannel={setSelectedChannel}
            setSelectedChannelId={setSelectedChannelId}
          />

        </div>
        <Message
          user={userData}
          setSelectedChannel={setSelectedChannel}
          selectedChannel={selectedChannel}
          selectedChannelId={selectedChannelId}
        />
      </div>
    </div>
  );
}

export default Orgmainchat;
