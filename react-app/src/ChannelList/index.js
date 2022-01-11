import "./channelList.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { readChannels } from "../store/channels";
import { useNavigate } from 'react-router-dom'

function ChannelList() {
    const [showEdit, setShowEdit] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [showh3, setShowh3] = useState(true)
    const [channelName, setChannelName] = useState('')
    const input = useRef(null)

    const { id } = useParams()
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channelReducer.channels);

    async function loadChannels() {
        await dispatch(readChannels(id))
    }

    useEffect(() => {
        loadChannels();
    }, [dispatch]);

    const editToggle = () => {
        if (showForm === true) return;
        if (showEdit === false) return setShowEdit(true);
        if (showEdit === true) return setShowEdit(false);
      }

    return (
        <div className="channelContainer">
            {channels ? channels.map((channel) => {
                return (
                    <div onClick={editToggle} className="singleChannel" key={channel.id}>
                        <h3># {showh3 && channel.name}</h3>
                        { showForm && (
                            <div>
                                <form className="editchannelform" onSubmit={ handleSubmit }>
                                    <input
                                        type='text'
                                        ref={input}
                                        placeholder={"New Name"}
                                        required
                                        value={channelName}
                                        onChange={e => setChannelName(e.target.value)}
                                    />
                                </form>
                            </div>
                        )}
                    </div>
                );
            }) : null}
        </div>
    );
}

export default ChannelList;
