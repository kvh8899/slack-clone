import "./message.css";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

// must use http here
//"https://<herokuname>.herokuapp.com" for heroku
let endPoint = "http://localhost:5000/";
let socket;
function Message({ user }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const dummyDiv = useRef(null);
  useEffect(() => {
    socket = io(`${endPoint}`);
    getMessages();
    return () => {
      socket.disconnect();
    };
  }, [messages.length]);

  const getMessages = () => {
    socket.once("message", (msg) => {
      setMessages([...messages, msg]);
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
        <h2>Title</h2>
      </div>
      <div className="messages">
        <div>
          {messages.map((msg) => {
            return (
              <div className="message">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt="404"></img>
                ) : (
                  <img
                    src="https://avatars.slack-edge.com/2015-03-13/4045125376_172ec0a9d33356de3571_88.jpg"
                    alt="404"
                  ></img>
                )}
                <div>
                  <h3>{user.username}</h3>
                  <p>{msg}</p>
                </div>
              </div>
            );
          })}
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
