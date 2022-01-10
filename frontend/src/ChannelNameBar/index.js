import React from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../store/session";
import MessageBar from "../MessageBar";


function ChannelNameBar() {

  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="channel-name-container-container">
      <div className="channel-name-container">
        <button className="submit-button" onClick={logout}>
          Log Out
        </button>
      </div>
      <MessageBar />
    </div>
  );
}

export default ChannelNameBar;
