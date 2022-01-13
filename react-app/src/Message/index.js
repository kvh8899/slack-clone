import "./message.css";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { editChannelThunk } from "../store/channels";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import {createOneMessage} from "../store/messages";
// must use http here
//"https://<herokuname>.herokuapp.com" for heroku
let endPoint = "http://localhost:5000";
let socket;

function Message({ user }) {
  const [message, setMessage] = useState("");
  const [channelName, setChannelName] = useState('')
  const [showForm, setShowForm] = useState(false)
  const { channelId } = useParams()
  const currentChannel = useSelector((state) => state.currentChannel);
  const allMessages = useSelector((state) => state.messages)
  const dispatch = useDispatch();
  const handleChannelSubmit = async e => {
    e.preventDefault()
    setShowForm(false)
    await dispatch(editChannelThunk(channelName, channelId))
  }
  const dummyDiv = useRef(null);
  useEffect(() => {
    socket = io(`${endPoint}`);
    getMessages();
    return () => {
      socket.disconnect();
    };
  }, [allMessages]);

  const getMessages = () => {
    socket.once("message", async(msg) => {
      await dispatch(createOneMessage(channelId,msg))
      dummyDiv.current.scrollIntoView(false);
    });
  };
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onClick = () => {
    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please add message");
    }
  };
  return (
    <div className="messageArea">
      <div className="title">
        <h2>{currentChannel}</h2>
        <button onClick={e => {
                    e.preventDefault()
                    setShowForm(!showForm)
                    }
                }
        >
          Edit
        </button>
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
          {allMessages.map((msg) => {
            return (
              <div className="message" key={msg.id}>
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="404"></img>
                ) : (
                  <img
                    // src="https://avatars.slack-edge.com/2015-03-13/4045125376_172ec0a9d33356de3571_88.jpg"
                    src="https://cdn.discordapp.com/attachments/919391399269515305/930910536193933312/aa_logo.png"
                    alt="404"
                  ></img>
                )}
                <div>
                  <h3>{user.username}</h3>
                  <p>{msg.content}</p>
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
          onSubmit={(e) => {
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
