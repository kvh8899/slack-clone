import "./channelList.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { readChannels, removeChannel } from "../store/channels";
import { setName } from "../store/currentChannel";
import { useNavigate } from "react-router-dom";

function ChannelList() {
  const hist = useNavigate();
  const specificChannel = useRef([]);
  const { id, channelId } = useParams();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelReducer);
  async function loadChannels() {
    await dispatch(readChannels(id));
  }
  function select() {
    specificChannel.current.forEach((e, i) => {
      if (e?.id !== channelId) {
        specificChannel.current[i]?.classList.remove("selected");
        return;
      }
      specificChannel.current[i]?.classList.remove("selected");
      specificChannel.current[i]?.classList.add("selected");
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    hist(`/organizations/${id}/channels/${channels[0].id}`)
    await dispatch(removeChannel(e.target.id));
  };
  useEffect(() => {
    loadChannels();
    specificChannel.current.slice(0, channels.length);
  }, [dispatch]);
  useEffect(() => {
    select();
  });
  useEffect(() => {
    channels.forEach((e) => {
      if (e.id === parseInt(channelId)) {
        dispatch(setName(`# ${e.name}`));
        return;
      }
    });
  }, [channels]);
  return (
    <div className="channelContainer">
      {channels
        ? channels?.map((channel, i) => {
            return (
              <div
                ref={(e) => (specificChannel.current[i] = e)}
                key={channel.id}
                className={`${channel.name} singleChannel`}
                id={channel.id}
                onClick={() => {
                  dispatch(
                    setName(specificChannel.current[i].children[0].innerHTML)
                  );
                  hist(
                    `/organizations/${id}/channels/${specificChannel.current[i].id}`
                  );
                }}
              >
                <h3># {channel.name}</h3>
                {channels.length > 1?<i
                  className="fas fa-trash-alt"
                  onClick={handleSubmit}
                  id={channel.id}
                ></i>:""}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default ChannelList;
