import "./orgmainchat.css";
import MessageBar from "../MessageBar";
import Message from "../Message";
import {useSelector} from "react-redux";
import { useEffect, useState } from "react";
function Orgmainchat() {
  const session = useSelector((state) => state.session.user);
  const [userData,setUserData] = useState({})
  async function getUserData(id){
    const res = await fetch(`/api/users/${session.id}`);
    if(res.ok){
      const user = await res.json();
      setUserData(user);
    }
    return null;
  }
  useEffect(() =>{
    if(session) getUserData(session.id)
  },[session])
  return (
      <div className="content">
        <div className="topBar">
          <div></div>
          <input placeholder={"Search"}></input>
          <div className="profile">
            {userData?.profilePicture ? <img src={userData.profilePicture} alt="404"></img>:<img src="https://avatars.slack-edge.com/2015-03-13/4045125376_172ec0a9d33356de3571_88.jpg" alt="404"></img>}
          </div>
        </div>
        <div className="midContent1">
          <MessageBar />
          <Message user={userData}/>
        </div>
      </div>
  );
}

export default Orgmainchat;
