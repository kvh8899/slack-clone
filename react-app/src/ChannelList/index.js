import "./channelList.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { readChannels, removeChannel } from "../store/channels";

function ChannelList() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channelReducer);

  async function loadChannels() {
    await dispatch(readChannels(id));
  }

  useEffect(() => {
    loadChannels();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(removeChannel(e.target.id));
  }

  return (
    <div className="channelContainer">
      {channels ? channels.map((channel) => {
            return (
              <div className="singleChannel" key={channel.id}>
                <h3># {channel.name}</h3>
                <i class="fas fa-trash-alt" onClick={handleSubmit} id={channel.id}></i>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default ChannelList;
