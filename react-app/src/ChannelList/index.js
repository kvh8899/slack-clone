import "./channelList.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useRef } from "react";
import { readChannels, removeChannel } from "../store/channels";
import { getAllMessages } from "../store/messages";
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
        dispatch(setName({name:`# ${e.name}`,prev:channelId}));
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
                onClick={async () => {
                  dispatch(
                    setName({name:specificChannel.current[i].children[0].innerHTML,prev:channelId})
                  );
                  await dispatch(getAllMessages(channel.id));
                  hist(
                    `/organizations/${id}/channels/${specificChannel.current[i].id}`
                  );
                }}
              >
                <h3># {channel.name}</h3>
                {channels.length > 1 ? (
                  <i
                    className="fas fa-trash-alt"
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      await dispatch(removeChannel(e.target.id));
                      if (!(channelId === e.target.id)) return;
                      for (let i = 0; i < channels.length; i++) {
                        //need to update state of channel messages
                        if (
                          channels[i].id === parseInt(e.target.id) &&
                          i === 0
                        ) {
                          hist(
                            `/organizations/${id}/channels/${
                              channels[i + 1].id
                            }`
                          );
                        } else if (channels[i].id === parseInt(e.target.id)) {
                          hist(
                            `/organizations/${id}/channels/${
                              channels[i - 1].id
                            }`
                          );
                        }
                      }
                    }}
                    id={channel.id}
                  ></i>
                ) : (
                  ""
                )}
              </div>
            );
          })
        : null}
    </div>
  );
}

export default ChannelList;
