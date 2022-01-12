import "./channelList.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { editChannel, readChannels, removeChannel } from "../store/channels";
import { useNavigate } from "react-router-dom";

function ChannelList({ setSelectedChannel, setSelectedChannelId }) {
  const [showForm, setShowForm] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [errors, setErrors] = useState([]);

  const specificChannel = useRef([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelReducer);

  async function loadChannels() {
    await dispatch(readChannels(id));
  }

  useEffect(() => {
    loadChannels();
    specificChannel.current.slice(0, channels.length);
  }, [dispatch]);

  const channelClick = (e, i) => {
    e.preventDefault();
  };

  return (
    <div className="channelContainer">
      {channels
        ? channels.map((channel, i) => {
            return (
              <>
                <div
                  ref={(e) => (specificChannel.current[i] = e)}
                  key={channel.id}
                  className={channel.name}
                  id={channel.id}
                  onClick={() => {
                    setSelectedChannel(specificChannel.current[i].className);
                  }}
                >
                  <h3
                    onClick={() => {
                      setChannelName(specificChannel.current[i].className);
                    }}
                  >
                    # {channel.name}
                  </h3>
                </div>
              </>
            );
          })
        : null}
    </div>
  );
}

export default ChannelList;
