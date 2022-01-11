import "./channelList.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { readChannels } from "../store/channels";

function ChannelList() {
    const { id } = useParams()
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channels);
    // console.log(channels)

    // async function loadChannels() {
    //     await dispatch(readChannels(id))
    // }

    useEffect(() => {
        dispatch(readChannels(id))
    }, []);

    return (
        <div >
            <div >
                {channels ? channels.map((channel) => {
                    return (
                        <div key={channel.id}>
                            <div>
                                <h3>{channel.name}</h3>
                            </div>
                        </div>
                    );
                }) : null}
            </div>
        </div>
    );
}

export default ChannelList;
