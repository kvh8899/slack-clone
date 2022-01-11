import "./orgmainchat.css";
import MessageBar from "../MessageBar";
import Message from "../Message";
import { useDispatch } from 'react-redux';
import { removeWorkspace } from "../store/organizations";
import { useParams } from "react-router";

import { useNavigate } from "react-router-dom";


function Orgmainchat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams()
  const testDelete = (e) => {
    e.preventDefault()
    dispatch(removeWorkspace(id))
    navigate('/organization')

  }
  return (
    <div className="content">
      <div className="topBar">
        <div></div>
        <input placeholder={"Search"}></input>
        <div>
          <img src="/dsa" alt="404"></img>
        </div>
      </div>
      <button onClick={testDelete}>Delete</button>
      <div className="midContent1">
        <MessageBar />
        <Message />
      </div>
    </div>
  );
}

export default Orgmainchat;
