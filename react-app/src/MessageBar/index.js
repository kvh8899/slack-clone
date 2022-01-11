import { editOrg, getOrg } from "../store/orgmainchat";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import "./messagebar.css";
import React, { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { removeWorkspace ,editOrgThunk } from "../store/organizations";

import {
  editChannelThunk,
  postChannel,
  readChannels,
  removeChannel,
} from "../store/channels";

function MessageBar() {
  const [showEdit, setShowEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showh2, setShowh2] = useState(true);
  const [channelName, setChannelName] = useState("");
  const [editChannelName, setEditChannelName] = useState("");

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
    setErrors([]);
    formToggle();
    editToggle();
    const data = await dispatch(editOrgThunk(orgName, id));
    await dispatch(getOrg(id))
    if (data) {
      return setErrors(data);
    }
  };
  useEffect(() => {
    dispatch(getOrg(id))
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
  // const testCreate = async (e) => {
  //   e.preventDefault()
  //   await dispatch(postChannel(id, channelName))
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
        {showh2 && <h2>{org.name}</h2>}
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
                    value={orgName}
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
      <div className="channels">
        <div
          onClick={(e) => {
            caret.current.classList.toggle("side");
          }}
        >
          <i className="fas fa-caret-down" ref={caret}></i>
          <p>Channels</p>
          {/* <button onClick={testRead}>show all channels</button>
          <form onSubmit={testCreate}>
            <input
              type="text"
              placeholder={"Name"}
              required
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
            <button>create a channel</button>
          </form>
          <button onClick={testDelete}>delete a channel</button>
          <form onSubmit={testEdit}>
            <input
              type="text"
              placeholder={"Name"}
              required
              value={editChannelName}
              onChange={(e) => setEditChannelName(e.target.value)}
            />
            <button>EDIT a channel</button>
          </form>
 */}
        </div>
      </div>
      <div className="channels">
        <div
          onClick={(e) => {
            dCaret.current.classList.toggle("side");
          }}
        >
          <i className="fas fa-caret-down" ref={dCaret}></i>
          <p>Direct Messages</p>
        </div>
      </div>
    </div>
  );
}

export default MessageBar;
