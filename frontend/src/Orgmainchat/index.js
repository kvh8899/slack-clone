import "./orgmainchat.css";
import MessageBar from "../MessageBar"
import Message from "../Message"
function Orgmainchat() {
  return (
    <div className="content">
      <div className="topBar">
        <div></div>
        <input placeholder={"Search"}></input>
        <div>
          <img src="/dsa" alt="404"></img>
        </div>
      </div>
      <div className="midContent">
        <MessageBar />
        <Message />
      </div>
    </div>
  );
}

export default Orgmainchat;
