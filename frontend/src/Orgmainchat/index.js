import "./orgmainchat.css";
import MessageBar from "../MessageBar";
import Message from "../Message";
import { useDispatch } from 'react-redux';
import { removeWorkspace } from "../store/organizations";
import { useParams } from "react-router";

import { useNavigate } from "react-router-dom";
import OrgEdit from "../EditOrgForm";


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
      <div className="midContent1">
        <MessageBar />
        <Message />
      </div>
      <OrgEdit />
    </div>
  );
}

export default Orgmainchat;
