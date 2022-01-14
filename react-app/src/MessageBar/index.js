import { removeWorkspace, editOrgThunk } from "../store/organizations";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrg } from "../store/orgmainchat";
import { useParams } from "react-router";
import NewChannel from "../newChannel";
import { useNavigate } from "react-router-dom";
import ChannelList from "../ChannelList";
import { editOrgOn } from "../store/showEditOrg";
import "./messagebar.css";

function MessageBar({ setSelectedChannel, setSelectedChannelId }) {
  const [showChannelList, setShowChannelList] = useState(true);
 const [showh2, setShowh2] = useState(true)
  const [showChannelList, setShowChannelList] = useState(true)

  const [showMemberList, setshowMemberList] = useState(true)
  const [channelName, setChannelName] = useState('')
  const [editChannelName, setEditChannelName] = useState('')
  const caret = useRef(null);
  const dCaret = useRef(null);
  const mCaret = useRef(null);
  const size = useRef(null);
  const size1 = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const org = useSelector((state) => state.orgmainchatReducer);
  const members = org.members
  // console.log(members, 'MEMBERS OBJECT')

  const session = useSelector((state) => state.session.user);

  // const users = org.available_users?.map(user => user.username)
  // console.log(users)


  const handleSubmit = async (e) => {
    e.preventDefault();
    // formToggle();
    // setShowEdit(false);
    const data = await dispatch(editOrgThunk(orgName, id));
  };

  useEffect(() => {
    dispatch(getOrg(id));
  }, []);

  return (
    <>
      <div className="messageBar">
        <div className="title">
          <h2 className="unselect">{org.name}</h2>
          <div
            className="is"
            id="e"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(editOrgOn());
            }}
          >
            <i className="fas fa-ellipsis-v"></i>
          </div>

          {/* {showh2 && <h2>{org.name}</h2>} <i class="fas fa-ellipsis-v"></i>
        {showForm && (
          <div>
            <form className="editorgform" onSubmit={handleSubmit}>
              <input
                type="text"
                ref={input}
                placeholder={"New Name"}
                required
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </form>

          </div>
        )} */}
        </div>
        {/* <div>
        {showEdit && (
          <div className="orgeditdiv">
            <p>Owned by {session?.username}</p>
            <button className="editbutton" onClick={formToggle}>
              Edit Name
            </button>
            <button className="editbutton" onClick={orgDelete}>
              Delete Org
            </button>
          </div>
        )}
      </div> */}
        <div className="channelContent" ref={size}>
          <div class="od">
            <div className="uc" ref={size1}>
              <div className="channels">
                <div>
                  <div
                    onClick={(e) => {
                      caret.current.classList.toggle("side");
                      if (!showChannelList) setShowChannelList(true);
                      if (showChannelList) setShowChannelList(false);
                    }}
                    className="cs"
                  >
                    <div className="is isc">
                      <i className="fas fa-caret-down" ref={caret}></i>
                    </div>

                    <p className="unselect">Channels</p>
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
                    className="cs"
                  >
                    <div className="is isc">
                      <i className="fas fa-caret-down" ref={dCaret}></i>
                    </div>
                    <p className="unselect">Direct Messages</p>
                  </div>
                  <div className="addChannel">
                    <button>
                      <div className="is">
                        <i className="fas fa-plus"></i>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="height"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="d"
        onMouseDown={(x) => {
          let drag = true;
          x.target.classList.add("dSelect");
          document.addEventListener("mouseup", () => {
            drag = false;
            x.target.classList.remove("dSelect");
          });
          document.addEventListener("mousemove", (e) => {
            if (e.clientX > 250 && e.clientX < 880 && drag) {
              size.current.style.width = (e.clientX + 2 )+ "px";
              size1.current.style.width = (e.clientX + 2) + "px";
            }
          });
        }}
      ></div>
    </>
  );
}

export default MessageBar
