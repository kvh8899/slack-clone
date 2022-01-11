import "./orgmainchat.css";
import MessageBar from "../MessageBar";
import Message from "../Message";
import OrgEdit from "../OrgEdit";


function Orgmainchat() {
  return (
    <div className="content">
      <div className="topBar">
        <input placeholder={"Search"}></input>
        <div>
          <img src="/dsa" alt="404"></img>
        </div>
      </div>
      <div className="midContent1">
        <MessageBar />
        <Message />
      </div>
    </div>
  );
}

export default Orgmainchat;
