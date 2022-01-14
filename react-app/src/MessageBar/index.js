import { removeWorkspace, editOrgThunk } from "../store/organizations";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrg } from "../store/orgmainchat";
import { useParams } from "react-router";
import NewChannel from "../newChannel";
import NewMember from "../NewMember";
import { useNavigate } from "react-router-dom";
import ChannelList from "../ChannelList";
import { editOrgOn } from '../store/showEditOrg'
import { removeMember } from "../store/orgmainchat";
import "./messagebar.css";



function MessageBar({ setSelectedChannel, setSelectedChannelId }) {

  const [showh2, setShowh2] = useState(true)
  const [showChannelList, setShowChannelList] = useState(true)

  const [showMemberList, setshowMemberList] = useState(true)
  const [channelName, setChannelName] = useState('')
  const [editChannelName, setEditChannelName] = useState('')
  const [deleteMember, setDeleteMember] = useState("");


  const caret = useRef(null);
  const dCaret = useRef(null);
  const mCaret = useRef(null);

  const dispatch = useDispatch();
  const hist = useNavigate();
  const { id, channelId } = useParams();
  const org = useSelector((state) => state.orgmainchatReducer);
  const members = org.members
  // console.log(members, 'MEMBERS OBJECT')
  const session = useSelector((state) => state.session.user);
  const input = useRef(null);
  const [orgName, setOrgName] = useState("");
  const [errors, setErrors] = useState([]);

  // const users = org.available_users?.map(user => user.username)
  // console.log(users)


  const handleSubmit = async (e) => {
    e.preventDefault();
    // formToggle();
    // setShowEdit(false);
    // const data = await dispatch(editOrgThunk(orgName, id));
    await dispatch(removeMember(deleteMember, org.id));
    hist(`/organizations/${org.id}/channels/${channelId}`)


  };

  useEffect(() => {
    dispatch(getOrg(id));
  }, []);

  return (
    <div className="messageBar">

      <div onClick={e => {
          e.stopPropagation()
          dispatch(editOrgOn())
        }} className="title">
        {showh2 && <h2>{org.name}</h2>} <i className="fas fa-ellipsis-v"></i>

      </div>

      <div className="channelContent">
        <div className="channels">
          <div>
            <div
              onClick={(e) => {
                caret.current.classList.toggle("side");
                if (!showChannelList) setShowChannelList(true);
                if (showChannelList) setShowChannelList(false);
              }}
            >
              <i className="fas fa-caret-down" ref={caret}></i>
              <p>Channels</p>
            </div>
            <NewChannel />
          </div>
          {/* <div className="ChannelList"> */}
          {showChannelList && (
            <ChannelList
              setSelectedChannel={setSelectedChannel}
              setSelectedChannelId={setSelectedChannelId}
            />
          )}
          {/* </div> */}
        </div>
        <div className="channels">
          <div>
            <div
              onClick={(e) => {
                dCaret.current.classList.toggle("side");
              }}
            >
              <i className="fas fa-caret-down" ref={dCaret}></i>
              <p>Direct Messages</p>
            </div>
            <div className="addChannel">
              <button>
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="channels">
          <div>
            <div
              onClick={(e) => {
                mCaret.current.classList.toggle("side");
                if (!showMemberList) setshowMemberList(true);
                if (showMemberList) setshowMemberList(false);
              }}
            >
              <i className="fas fa-caret-down" ref={mCaret}></i>
              <p>Members</p>
            </div>
            <NewMember />
          </div>
          {/* <div className="ChannelList"> */}
          {showMemberList && (

          <div className="channelContainer">
            {members? members?.map((member) => {
                  return (
                    <form key={member.id} onSubmit={handleSubmit}>
                      <h3>
                        - {member.username}
                        {members.length > 1 ? (
                          <button className="btn">
                            <i
                              className="fas fa-trash-alt channelContainer"
                              onClick={() => {
                                setDeleteMember(member.id);
                              }}
                            ></i>
                          </button>
                        ) : (
                          ""
                        )}
                      </h3>
                    </form>
                  );
                })
              : null}
          </div>
          )}
        </div>
        <div className="height"></div>
      </div>
    </div>
  );
}

export default MessageBar
