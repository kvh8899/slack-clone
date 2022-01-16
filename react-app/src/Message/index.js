import "./message.css";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { editChannelThunk } from "../store/channels";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom"

import {createOneMessage ,getAllMessages} from "../store/messages";
import EditChannel from '../EditChannel'
// must use http here
//"https://<herokuname>.herokuapp.com" for heroku
let endPoint = "http://localhost:5000";
let socket;
function Message({ user }) {
  const [message, setMessage] = useState("");
  const [incoming,setIncoming] = useState([])
  const [channelName, setChannelName] = useState('')
  const [showForm, setShowForm] = useState(false)
  const { channelId } = useParams()
  const currentChannel = useSelector((state) => state.currentChannel)
  const allMessages = useSelector((state) => state.messages)
  const session = useSelector((state) => state.session.user)
  const dispatch = useDispatch();
  const handleChannelSubmit = async e => {
    e.preventDefault()
    setShowForm(false)
    setChannelName('')
    await dispatch(editChannelThunk(channelName, channelId))
  }
  const dummyDiv = useRef(null);
  useEffect(() => {
    socket = io(`${endPoint}`);
    socket.on("message", (msg) => {
      //create msg
      setIncoming(msg)
      dummyDiv.current.scrollIntoView(false);
    })
    return () => {
      socket.disconnect();
    };
  },[])
  useEffect(() => {
    setIncoming(allMessages)
    socket.emit('leaveroom',{channelId:currentChannel.prev})
    socket.emit('joinroom',{channelId,session,message});
  },[channelId,allMessages])
  useEffect(() => {
    dummyDiv.current.scrollIntoView(false);
  })
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onClick = async() => {
    if (message !== "") {
      await dispatch(createOneMessage(channelId,message)) 
      const msgs = await dispatch(getAllMessages(channelId))
      socket.emit("message", {channelId,session,allMessages:msgs.messages});
      setMessage("");
    } else {
      alert("Please add message");
    }
  };
  return (
    <div className="messageArea">
      <div className="title">
        <h2 className="unselect">{currentChannel.name}</h2>
        <EditChannel />
        { showForm && (
          <div>
            <form className="editchannelnameform" onSubmit={ handleChannelSubmit }>
              <input
                type='text'
                placeholder={"New Channel Name"}
                required
                value={channelName}
                onChange={e => setChannelName(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
      <div className="messages">
        <div>
          {incoming.map((msg) => {
            return (
              
              <div className="message" key={msg.id}>
                {msg?.owner?.profilePicture ? (
                  <img src={msg.owner?.profilePicture} alt="404"></img>
                ) : (
                  <img
                    src="https://cdn.discordapp.com/attachments/919391399269515305/930910536193933312/aa_logo.png"
                    alt="404"
                  ></img>
                )}
                <div>
                  <h3>{msg?.owner?.username}</h3>
                  <p>{msg?.content}</p>
                </div>
              </div>
            );
          })}
          <div className="space"></div>
          <p ref={dummyDiv}></p>
        </div>
      </div>
      <div className="inputMessages">
        <form
          onSubmit={async(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          <input
            value={message}
            onChange={(e) => onChange(e)}
            placeholder={"Message"}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default Message;
