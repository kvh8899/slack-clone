import "./channelList.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { readChannels } from "../store/channels";

function ChannelList() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channelReducer.channels);

    async function loadChannels() {
        await dispatch(readChannels(id))
    }

    useEffect(() => {
        loadChannels();
    }, [dispatch]);

    return (
        <div className="channelContainer">
            {channels ? channels.map((channel) => {
                return (
                    <div className="singleChannel" key={channel.id}>
                        <h3># {channel.name}</h3>
                    </div>
                );
            }) : null}
        </div>
    );
}

export default ChannelList;
