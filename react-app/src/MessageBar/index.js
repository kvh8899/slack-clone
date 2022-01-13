import { removeWorkspace, editOrgThunk } from "../store/organizations";
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrg } from "../store/orgmainchat";
import { useParams } from "react-router";
import NewChannel from "../newChannel";
import { useNavigate } from "react-router-dom";
import ChannelList from "../ChannelList";
import "./messagebar.css";

function MessageBar({ setSelectedChannel, setSelectedChannelId }) {
  const [showEdit, setShowEdit] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showh2, setShowh2] = useState(true)
  const [showChannelList, setShowChannelList] = useState(true)
  const [channelName, setChannelName] = useState('')
  const [editChannelName, setEditChannelName] = useState('')

  const caret = useRef(null);
  const dCaret = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const org = useSelector((state) => state.orgmainchatReducer);
  const session = useSelector((state) => state.session.user);
  const input = useRef(null);
  const [orgName, setOrgName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    formToggle();
    setShowEdit(false);
    const data = await dispatch(editOrgThunk(orgName, id));

    await dispatch(getOrg(id));
    if (data) {
      return setErrors(data);
    }
  };

  useEffect(() => {
    dispatch(getOrg(id));
  }, []);

  const editToggle = () => {
    if (showForm === true) return;
    if (showEdit === false) return setShowEdit(true);
    if (showEdit === true) return setShowEdit(false);
  };

  const formToggle = () => {
    if (showForm === false) {
      setShowh2(false);
      return setShowForm(true);
    } else {
      setShowh2(true);
      return setShowForm(false);
    }
  };

  // const testRead = (e) => {
  //   e.preventDefault()
  //   dispatch(readChannels(id))
  // }
  // const testDelete = async (e) => {
  //   e.preventDefault()
  //   await dispatch(removeChannel(5, channelName))
  // }
  // const testEdit = async (e) => {
  //   e.preventDefault()
  //   await dispatch(editChannelThunk(id, editChannelName, 7))
  // }

  const orgDelete = async (e) => {
    e.preventDefault();
    await dispatch(removeWorkspace(id));
    navigate("/organization");
  };

  return (
    <div className="messageBar">
      <div onClick={editToggle} className="title">
        {showh2 && <h2>{org.name}</h2>} <i class="fas fa-ellipsis-v"></i>
        {showForm && (
          <div>
            <div>
              <div>
                <form className="editorgform" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    ref={input}
                    placeholder={"New Name"}
                    required
                    value={org.name}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
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
          {showChannelList && <ChannelList setSelectedChannel={setSelectedChannel} setSelectedChannelId={setSelectedChannelId}/>}
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
        <div className="height"></div>
      </div>
    </div>
  );
}

export default MessageBar;
