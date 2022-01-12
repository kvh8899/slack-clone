import "./channelList.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { editChannel, readChannels, removeChannel } from "../store/channels";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";

function ChannelList({ setSelectedChannel, setSelectedChannelId }) {
  const [showForm, setShowForm] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelParams] = useSearchParams();
  const hist = useNavigate();
  const specificChannel = useRef([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelReducer);
  async function loadChannels() {
    await dispatch(readChannels(id));
  }
  function select() {
    let current = channelParams.get("channel");

    specificChannel.current.forEach((e, i) => {
      if (e.id !== current) {
        specificChannel.current[i].classList.remove("selected");
        return;
      }
      specificChannel.current[i].classList.remove("selected");
      specificChannel.current[i].classList.add("selected");
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(removeChannel(e.target.id));
  }
  useEffect(() => {
    loadChannels();
    specificChannel.current.slice(0, channels.length);
  }, [dispatch]);
 useEffect(() => {
    select();
 })
  return (
    <div className="channelContainer">
      {channels
        ? channels?.map((channel, i) => {
            return (
                <div
                  ref={(e) => (specificChannel.current[i] = e)}
                  key={channel.id}
                  className=`${channel.name} singleChannel`
                  id={channel.id}
                  onClick={() => {
                    setSelectedChannel(specificChannel.current[i].classList[0]);
                    setSelectedChannelId(specificChannel.current[i].id);
                    hist(
                      `?${createSearchParams({
                        channel: `${specificChannel.current[i].id}`,
                      })}`
                    );
                  }}
                >
                  <h3
                    onClick={() => {
                      setChannelName(specificChannel.current[i].className);
                    }}
                  >
                    # {channel.name}
                  </h3>
                <i className="fas fa-trash-alt" onClick={handleSubmit} id={channel.id}></i>
                </div>
            );
          })
        : null}
    </div>
  );
}

export default ChannelList;
