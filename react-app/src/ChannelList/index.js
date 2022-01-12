import "./channelList.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { editChannel, readChannels, removeChannel } from "../store/channels";
import { useNavigate } from 'react-router-dom'

function ChannelList() {
    const [showEdit, setShowEdit] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [showh3, setShowh3] = useState(true)
    const [channelName, setChannelName] = useState('')
    const [channelId, setChannelId] = useState(null)
    const [errors, setErrors] = useState([])

    const input = useRef(null)
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const channels = useSelector((state) => state.channelReducer.channels)

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

    const formToggle = () => {
        if (showForm === false) {
          setShowh3(false);
          return setShowForm(true);
        } else {
          setShowh3(true);
          return setShowForm(false);
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setErrors([])
        formToggle()
        setShowEdit(false)
        const data = await dispatch(editChannel(channelName, channelId))
        await dispatch(readChannels(id))
        if (data) {
            return setErrors(data)
        }
    }

    const channelDelete = async e => {
        e.preventDefault()
        await dispatch(removeChannel(channelId))
        navigate('/channels')
    }

    return (
        <div className="channelContainer">
            {channels ? channels.map((channel) => {
                return (
                    <>
                        <div onClick={editToggle} className="singleChannel" key={channel.id}>
                            <h3 onClick={setChannelId(channel.id)}># {showh3 && channel.name}</h3>
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
                        <div>
                            {showEdit && (
                                <div className="channelEditDiv">
                                    <button className="editbutton" onClick={formToggle}>
                                        Edit Channel Name
                                    </button>
                                    <button className="deletebutton" onClick={channelDelete}>
                                        Delete Channel
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                );
            }) : null}
        </div>
    );
}

export default ChannelList;
