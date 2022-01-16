import "./message.css";
import { useState, useEffect, useRef } from "react";
import { editChannelThunk } from "../store/channels";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { createOneMessage, addMessage } from "../store/messages";
import { getSocket } from "../store/socket";
import EditChannel from "../EditChannel";
function Message({ user }) {
  const [message, setMessage] = useState("");
  const [channelName, setChannelName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { channelId } = useParams();
  const currentChannel = useSelector((state) => state.currentChannel);
  const allMessages = useSelector((state) => state.messages);
  const session = useSelector((state) => state.session.user);
  const socket = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  const handleChannelSubmit = async (e) => {
    e.preventDefault();
    setShowForm(false);
    setChannelName("");
    await dispatch(editChannelThunk(channelName, channelId));
  };
  const dummyDiv = useRef(null);
  useEffect(() => {
    dummyDiv?.current?.scrollIntoView(false);
    if(!socket){
      dispatch(getSocket())
    }
    if (socket) {
      socket.on("message", (msg) => {
        //create msg
        const { allMessages } = msg;
        dispatch(addMessage(allMessages));
      });
      return () => {
        socket.disconnect()
      }
    }
  }, [socket]);
  useEffect(() => {
    dummyDiv?.current?.scrollIntoView(false);
  }, [allMessages]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  const onClick = async () => {
    if (message !== "") {
      const msg = await dispatch(createOneMessage(channelId, message));
      socket.emit("message", { channelId, session, allMessages: msg });
      dummyDiv?.current?.scrollIntoView(false);
      setMessage("");
    } else {
      alert("Please add message");
    }
  };
  return (
    <div className="messageArea">
      <div className="title">
        <h2 className="unselect"># {currentChannel.name}</h2>
        <EditChannel />
        {showForm && (
          <div>
            <form
              className="editchannelnameform"
              onSubmit={handleChannelSubmit}
            >
              <input
                type="text"
                placeholder={"New Channel Name"}
                required
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
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
          onSubmit={async (e) => {
            e.preventDefault();
            onClick();
          }}
        >
          <input
            name="message"
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
